//var baseURL = "http://localhost:1701/micrometrics/";
browser.storage.local.get("serverURL").then(function (result) {
   if (!result.serverURL) {
       browser.storage.local.set({"serverURL": "http://usabilityrater.tk/micrometrics/"});
   }
});

function sendMessageCurrentTab(data) {
    getCurrentTab(function (tab) {
        browser.tabs.sendMessage(tab.id, data);
    });
}

browser.browserAction.onClicked.addListener(function () {
    sendMessageCurrentTab({"message": "open"});
});

browser.runtime.onMessage.addListener(function (request) {
   if (request.message == "start") {
       browser.storage.local.get("serverURL").then(function (result) {
           var url = result.serverURL + "start_screencast";
           sendRequest(url, {"screencastId": request.screencastId, "screencastName": request.screencastName}, function (response) {
               sendMessageCurrentTab({"message": "start_recording"});
               browser.browserAction.setIcon({path: {"64": "resources/stop_icon.jpg"}});
           });
       });
   }
   else if (request.message == "stop") {
       browser.browserAction.setIcon({path: {"64": "resources/play_icon.png"}});
   }
});

browser.runtime.onMessage.addListener(function (request) {
    if (request.message == "save") {
        const data = JSON.stringify(request.data);
        browser.storage.local.get("serverURL").then(function (result) {
            var url = result.serverURL + "screencast";
            sendRequest(url, data);
        });
    }
});

browser.runtime.onMessage.addListener(function (request) {
    if (request.message == "sendLogs") {
        const data = JSON.stringify(request.logs);
        browser.storage.local.get("serverURL").then(function (result) {
            var url = result.serverURL + "metrics";
            sendRequest(url, data);
        });
    }
});

function sendRequest(url, data, callback) {
    axios.post(url,data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (callback) {
            callback(response);
        }
    });
}


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