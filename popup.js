document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("myForm");
    var clearButton = document.getElementById("clearData");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var inputText = document.getElementById("inputText").value;
        var passwordText = document.getElementById("passwordText").value;

        // Store the credentials in Browser storage
        browser.storage.sync.set({ 'login': inputText, 'password': passwordText }, function () {
            console.log('Credentials stored');
        });

        // Close the extension popup (optional)
        window.close();
    });
    clearButton.addEventListener("click", (e) => {
        e.preventDefault();
        browser.storage.sync.clear();
    })

});
