document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("form");
    let clearButton = document.getElementById("clearData");

    // Executes on Submitting the Login Form
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let usernameText = document.getElementById("usernameText").value;
        let passwordText = document.getElementById("passwordText").value;

        // Store the credentials in Browser storage
        browser.storage.sync.set({ 'username': usernameText, 'password': passwordText }, function () {
            console.log('Credentials Stored');
        });

        // Close the extension popup on submit
        window.close();
    });
    // Clear Button Logic
    clearButton.addEventListener("click", (e) => {
        e.preventDefault();
        browser.storage.sync.clear();
    })

});
