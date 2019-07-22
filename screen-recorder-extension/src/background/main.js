//require('webextension-polyfill');

browser.browserAction.onClicked.addListener(function () {
    getCurrentTab(function (tab) {
        browser.tabs.sendMessage(tab.id, {
            "call": "open"
        });


    });
});

browser.runtime.onMessage.addListener(function (request) {
   if (request.message == "start") {
       browser.browserAction.setIcon({path: {"64": "resources/stop_icon.jpg"}});
   }
   else if (request.message == "stop") {
       browser.browserAction.setIcon({path: {"64": "resources/play_icon.png"}});
   }
});

browser.runtime.onMessage.addListener(function (request) {
    if (request.message == "save") {
        const data = JSON.stringify(request.data);
        axios.post('http://localhost:5000/api/logger/rrweb', {
            method: 'post',
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
});


function getCurrentTab (callback) {
    try {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            callback(tabs[0]);
    });
    }
    catch (err) {
        console.log("exception");
        console.log(err);
    }
}