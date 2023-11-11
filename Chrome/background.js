chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        chrome.storage.sync.get(['username', 'password'], function (data) {
            let username = data.username;
            let password = data.password;

            // Display Popup
            // Listen for messages from content scripts or other parts of the extension
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                // Check if the message is requesting to open the popup
                if (message.action === "openPopup") {
                    // Set the popup to popup.html
                    chrome.action.setPopup({ popup: "popup.html" });

                    // Open the extension options page, triggering the popup to open
                    chrome.runtime.openOptionsPage();

                    // Reset the popup to the default popup.html after a short delay
                    setTimeout(() => {
                        chrome.action.setPopup({ popup: "" });
                    }, 100);
                }
            });

            // Execute login.js if username and password exist in the browser storage
            if (username != null && password != null) {
                chrome.tabs.executeScript(currentTab.id, {
                    file: "/login.js",
                    runAt: 'document_idle'
                });
            }
        });
    });
});
