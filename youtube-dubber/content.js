console.log("YouTube Dubber: Ultimate Subtitle Reader dimuat.");

// --- VARIABEL GLOBAL & STATE ---
let dubbingActive = false;
let speechQueue = [];
let isSpeaking = false;
let lastSubtitleText = "";
let availableVoices = []; // Untuk menyimpan suara yang tersedia

// --- FUNGSI UNTUK MEMUAT SUARA ---
function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
        console.log("YouTube Dubber: Daftar suara berhasil dimuat.");
    } else {
        console.warn("YouTube Dubber: Daftar suara masih kosong, akan dicoba lagi nanti.");
    }
}

// Memuat suara saat skrip dimulai dan saat daftar suara di sistem berubah
loadVoices();
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

// --- FUNGSI UTAMA UNTUK BERBICARA ---
function processSpeechQueue() {
    if (isSpeaking || speechQueue.length === 0) {
        return;
    }

    isSpeaking = true;
    const textToSpeak = speechQueue.shift();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    chrome.storage.sync.get(['targetLang'], (result) => {
        const targetLang = result.targetLang || 'id-ID';
        utterance.lang = targetLang;
        utterance.rate = 1.1;

        if (availableVoices.length === 0) loadVoices();
        
        const specificVoice = availableVoices.find(voice => voice.lang === targetLang);
        if (specificVoice) {
            utterance.voice = specificVoice;
            console.log("Menggunakan suara spesifik:", specificVoice.name);
        } else {
            console.warn(`Tidak ditemukan suara untuk ${targetLang}, menggunakan suara default sistem.`);
        }

        utterance.onend = () => {
            isSpeaking = false;
            processSpeechQueue();
        };

        utterance.onerror = (event) => {
            console.error("SpeechSynthesis Error:", event.error);
            isSpeaking = false;
            processSpeechQueue();
        };
        
        console.log("Berbicara:", textToSpeak);
        window.speechSynthesis.speak(utterance);
    });
}

// --- FUNGSI UNTUK MENERJEMAHKAN ---
async function translateText(text, targetLangCode) {
    if (!text) return "";
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLangCode}&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0].map(item => item[0]).join('');
    } catch (error) {
        console.error("Kesalahan terjemahan:", error);
        return `[Gagal menerjemahkan: ${text}]`;
    }
}


// --- OBSERVER UNTUK SUBTITLE ---
const observer = new MutationObserver(async (mutations) => {
    if (!dubbingActive) return;
    const subtitleContainer = document.querySelector('.ytp-caption-segment');
    if (!subtitleContainer) return;

    const currentSubtitleText = subtitleContainer.innerText;

    if (currentSubtitleText && currentSubtitleText !== lastSubtitleText) {
        let textToTranslate = "";
        if (currentSubtitleText.startsWith(lastSubtitleText)) {
            textToTranslate = currentSubtitleText.substring(lastSubtitleText.length).trim();
        } else {
            textToTranslate = currentSubtitleText.trim();
        }
        
        lastSubtitleText = currentSubtitleText;

        if (textToTranslate) {
            const { targetLang } = await chrome.storage.sync.get('targetLang');
            const langCode = targetLang ? targetLang.split('-')[0] : 'id';
            const translatedText = await translateText(textToTranslate, langCode);
            speechQueue.push(translatedText);
            processSpeechQueue();
        }
    }
});

// --- FUNGSI BARU YANG LEBIH TANGGUH UNTUK MEMULAI OBSERVER ---
function startObserver() {
    const captionWindow = document.querySelector('.ytp-caption-window-container');
    if (captionWindow) {
        observer.observe(captionWindow, { childList: true, subtree: true });
        console.log("Observer subtitle berhasil diaktifkan.");
    } else {
        // Jika tidak ditemukan, coba lagi setelah 1 detik.
        console.warn("Jendela subtitle belum ditemukan, mencoba lagi dalam 1 detik...");
        setTimeout(startObserver, 1000);
    }
}


// --- MANAJEMEN STATUS ON/OFF ---
function setDubbingStatus(isActive) {
    dubbingActive = isActive;
    console.log("Status Dubbing diubah menjadi:", isActive);
    
    // **LOGIKA BARU:** Selalu cari elemen video saat fungsi ini dipanggil
    const videoElement = document.querySelector('video');

    if (isActive) {
        if (videoElement) {
            videoElement.muted = true;
            console.log("Video berhasil dibisukan.");
        } else {
            console.error("Elemen video tidak ditemukan!");
        }
        startObserver(); // Gunakan fungsi baru yang tangguh
    } else {
        if (videoElement) {
            videoElement.muted = false;
            console.log("Video berhasil di-unmute.");
        }
        observer.disconnect();
        speechQueue = [];
        window.speechSynthesis.cancel();
        isSpeaking = false;
        lastSubtitleText = "";
        console.log("Observer subtitle dinonaktifkan dan semua proses dihentikan.");
    }
}

// Listener untuk perubahan dari popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.dubbingActive) {
        setDubbingStatus(changes.dubbingActive.newValue);
    }
});

// Mengambil status awal saat halaman pertama kali dimuat
chrome.storage.sync.get('dubbingActive', (result) => {
    // Beri sedikit jeda untuk memastikan halaman YouTube siap
    setTimeout(() => {
        setDubbingStatus(result.dubbingActive || false);
    }, 500);
});

