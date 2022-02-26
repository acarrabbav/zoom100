function updateZoom(tabId) {
    chrome.tabs.setZoomSettings(
        tabId, { mode: "disabled", scope: "per-tab" },
        _ => console.log(chrome.runtime.lastError)
    );

    chrome.tabs.getZoom(tabId, (zoomFactor) => {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: (zoomFactor) => {
                const newZoomLevel = 1 / +zoomFactor;
                document.body.style.zoom = newZoomLevel;
            },
            args: ["" + zoomFactor]
        }, _ => console.log(chrome.runtime.lastError));
    });
}

chrome.tabs.onUpdated.addListener((tabId) => {
    updateZoom(tabId);
});

chrome.tabs.onZoomChange.addListener((zoomInfo) => {
    updateZoom(zoomInfo.tabId);
});