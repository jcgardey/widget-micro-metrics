document.addEventListener("DOMContentLoaded", function restoreOptions() {
    browser.storage.local.get("serverURL").then(function (result) {
        if (!result.serverURL) {
            result.serverURL = "http://usabilityrater.tk/micrometrics/";
        }
        document.querySelector("#url").value = result.serverURL;
    });
    document.querySelector("form").addEventListener("submit", function saveOptions(e) {
        e.preventDefault();
        browser.storage.local.set({serverURL: document.querySelector("#url").value});
    });
});