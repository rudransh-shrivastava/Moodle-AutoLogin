browser.webNavigation.onCompleted.addListener(function (details) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        let username = browser.storage.sync.get('username');
        let password = browser.storage.sync.get('password');

        // Execute login.js if username and password exist in the browser storage
        if (username != null && password != null) {
            browser.tabs.executeScript(currentTab.id, {
                file: "/login.js",
                runAt: 'document_idle'
            });
        }
    });
});
