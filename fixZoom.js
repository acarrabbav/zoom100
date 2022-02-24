'use strict';
(chrome => {
    const ZOOM_FACTOR = 1;

    function setTo100(tabId) {
        chrome.tabs.setZoomSettings(
            tabId, { mode: "automatic", scope: "per-tab" },
            () => chrome.tabs.setZoom(tabId, ZOOM_FACTOR)
        );
    }
    chrome.tabs.onZoomChange.addListener(
        (zoomInfo) => {
            if (zoomInfo.newZoomFactor != ZOOM_FACTOR) setTo100(zoomInfo.tabId)
        }
    )
})(window.chrome)