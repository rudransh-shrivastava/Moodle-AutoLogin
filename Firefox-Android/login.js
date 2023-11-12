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

                    // Comment the Following lines during development to prevent login.
                    if (loginErrorMessage == null) {
                        let loginForm = loginInput.closest('form');
                        if (loginForm) {
                            loginForm.submit();
                        }
                    } else {
                        // Else notify the user
                        window.stop();
                        notifyUser();
                    }
                    // Till here
                }
            } else {
                // Notify the user
                notifyUser();
            }
        }, 100);
    })
    .catch((error) => {
        console.error("Error retrieving data from storage:", error);
    });
function notifyUser() {

    window.alert("Please Setup Login and Password, To do so >> Click on 3 dots on the bottom right >> Click Add-ons >> Select MoodleAutoLogin >> Fill the details and Click Save Data.");
}