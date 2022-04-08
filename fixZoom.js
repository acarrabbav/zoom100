function updateZoom(tabId) {
    chrome.tabs.setZoomSettings(
        tabId, { mode: "automatic", scope: "per-tab" },
        _ => console.log(chrome.runtime.lastError)
    );

    chrome.tabs.getZoom(tabId, (zoomFactor) => {
        if (zoomFactor !== .8) {
            chrome.tabs.setZoom(tabId, .8, () => {});
        }
    });
}

chrome.tabs.onUpdated.addListener((tabId) => {
    updateZoom(tabId);
});

chrome.tabs.onZoomChange.addListener((zoomInfo) => {
    updateZoom(zoomInfo.tabId);
});