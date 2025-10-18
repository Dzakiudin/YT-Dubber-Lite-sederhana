document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleDubbing');
    const statusDiv = document.getElementById('status');
    const langSelect = document.getElementById('langSelect');

    // Memuat status dan bahasa tersimpan
    chrome.storage.sync.get(['dubbingActive', 'targetLang'], (result) => {
        updateButton(result.dubbingActive || false);
        if (result.targetLang) {
            langSelect.value = result.targetLang;
        }
    });

    // Mengatur tombol on/off
    toggleButton.addEventListener('click', () => {
        chrome.storage.sync.get('dubbingActive', (result) => {
            const newState = !result.dubbingActive;
            chrome.storage.sync.set({ dubbingActive: newState }, () => {
                updateButton(newState);
            });
        });
    });

    // Menyimpan pilihan bahasa
    langSelect.addEventListener('change', () => {
        chrome.storage.sync.set({ targetLang: langSelect.value });
    });

    function updateButton(isActive) {
        if (isActive) {
            toggleButton.textContent = 'Hentikan Dubbing';
            toggleButton.className = 'active';
            statusDiv.textContent = 'Status: Aktif';
        } else {
            toggleButton.textContent = 'Mulai Dubbing';
            toggleButton.className = '';
            statusDiv.textContent = 'Status: Tidak Aktif';
        }
    }
});

