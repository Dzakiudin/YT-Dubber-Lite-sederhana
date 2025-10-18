// Mengatur status awal saat ekstensi diinstal
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ dubbingActive: false });
});

// Listener ini tidak terlalu diperlukan lagi tapi baik untuk debugging
chrome.action.onClicked.addListener((tab) => {
    console.log("Ikon ekstensi diklik.");
});

