browser.storage.sync.get(['login', 'password'])
    .then((result) => {
        var username = result.login;
        var password = result.password;
        var loginErrorMessage = document.getElementById('loginerrormessage');
        setTimeout(() => {
            if (username && password) {
                var loginInput = document.querySelector('input[name="username"]');
                var passwordInput = document.querySelector('input[name="password"]');
                if (loginInput && passwordInput) {
                    loginInput.value = username;
                    passwordInput.value = password;

                    // Trigger the form submission if login error message is not present

                    // if (loginErrorMessage == null) {
                    //     var loginForm = loginInput.closest('form');
                    //     if (loginForm) {
                    //         loginForm.submit();
                    //     }
                    // } else {
                    //     // Else open the popup for login
                    //     window.stop();
                    //     browser.runtime.sendMessage({ action: "openPopup" });
                    // }
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
