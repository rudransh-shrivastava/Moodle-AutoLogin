browser.webNavigation.onCompleted.addListener(function (details) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        let username = browser.storage.sync.get('username');
        let password = browser.storage.sync.get('password');

        // Display Popup
        // Listen for messages from content scripts or other parts of the extension
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            // Check if the message is requesting to open the popup
            if (message.action === "openPopup") {
                // Set the popup to popup.html
                browser.browserAction.setPopup({ popup: "popup.html" });

                // Open the extension options page, triggering the popup to open
                browser.runtime.openOptionsPage();

                // Reset the popup to the default popup.html after a short delay
                setTimeout(() => {
                    browser.browserAction.setPopup({ popup: "" });
                }, 100);
            }
        });
        // Execute login.js if username and password exist in the browser storage
        if (username != null && password != null) {
            browser.tabs.executeScript(currentTab.id, {
                file: "/login.js",
                runAt: 'document_idle'
            });
        }
    });
});
