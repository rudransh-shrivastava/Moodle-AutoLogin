browser.webNavigation.onCompleted.addListener(function (details) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        var username = browser.storage.sync.get('login');
        var password = browser.storage.sync.get('password');
        // Listen for messages from content scripts or other parts of the extension
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            // Check if the message is requesting to open the popup
            if (message.action === "openPopup") {
                // Set the popup to a blank HTML page
                browser.browserAction.setPopup({ popup: "popup.html" });

                // Open the extension options page, triggering the popup to open
                browser.runtime.openOptionsPage();

                // Reset the popup to the default popup.html after a short delay
                setTimeout(() => {
                    browser.browserAction.setPopup({ popup: "" });
                }, 100);
            }
        });
        if (username != null && password != null) {
            browser.tabs.executeScript(currentTab.id, {
                file: "/login.js",
                runAt: 'document_idle'
            });
        }
    });
});
