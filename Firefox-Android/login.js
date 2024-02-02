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
                    console.log(loginForm);
                    if (loginForm) {
                        loginForm.submit();
                    }
                    if (loginErrorMessage.textContent.trim() === "Invalid login, please try again") {
                        // open the popup for login
                        notifyUser();
                        window.stop();
                    }
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

    window.alert("Please Setup Login and Password, To do so >> Click on 3 dots on the top right >> Click Add-ons >> Select MoodleAutoLogin >> Fill the details and Click Save Data.");
}
