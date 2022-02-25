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
                console.log(document.body);
                document.body.style.zoom = newZoomLevel;
            },
            args: ["" + zoomFactor]
        }, _ => console.log(chrome.runtime.lastError));
    });
}

chrome.tabs.onUpdated.addListener((tabId) => {
    console.log("UPDATED");
    updateZoom(tabId);
});

chrome.tabs.onZoomChange.addListener((zoomInfo) => {
    console.log("ZOOM CHANGE");
    updateZoom(zoomInfo.tabId);
});