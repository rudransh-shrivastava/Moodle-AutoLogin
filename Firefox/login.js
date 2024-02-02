browser.storage.sync.get(['username', 'password'])
    .then((result) => {
        let username = result.username;
        let password = result.password;
        let loginErrorMessage = document.getElementById('loginerrormessage');

        // Handle inputs or open popup if no credentials stored in browser storage
        setTimeout(() => {
            if (username && password) {
                let loginInput = document.querySelector('input[name="username"]');
                let passwordInput = document.querySelector('input[name="password"]');
                if (loginInput && passwordInput) {
                    loginInput.value = username;
                    passwordInput.value = password;

                    // Trigger the form submission if login error message is not present

                    let loginForm = document.getElementById('login');
                    if (loginForm) {
                        loginForm.submit();
                    }
                    if (loginErrorMessage.textContent.trim() === "Invalid login, please try again") {
                        // open the popup for login
                        browser.runtime.sendMessage({ action: "openPopup" });
                        window.stop();
                    }
                }
            } else {
                // Send a message to the background script to open the popup
                browser.runtime.sendMessage({ action: "openPopup" });
            }
        }, 100);
    })
    .catch((error) => {
        console.error("Error retrieving data from storage:", error);
    });
