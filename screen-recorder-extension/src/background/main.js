//var baseURL = "http://localhost:1701/micrometrics/";
browser.storage.local.get('serverURL').then(function (result) {
  if (!result.serverURL) {
    browser.storage.local.set({
      serverURL: 'http://localhost:1701/micrometrics/',
    });
  }
});

function sendMessageCurrentTab(data) {
  getCurrentTab(function (tab) {
    browser.tabs.sendMessage(tab.id, data);
  });
}

browser.browserAction.onClicked.addListener(function () {
  sendMessageCurrentTab({ message: 'open' });
});

browser.runtime.onMessage.addListener(function (request) {
  if (request.message == 'start') {
    browser.browserAction.setIcon({ path: { 64: 'resources/stop_icon.png' } });
  } else if (request.message == 'stop') {
    browser.browserAction.setIcon({ path: { 64: 'resources/play_icon.png' } });
    browser.storage.local.get().then(function (data) {
      if (data.screencastId) {
        const body = {
          events: data.allEvents.concat(request.data.events),
          metrics: request.data.widgets,
          screencastId: data.screencastId,
          screencastName: data.screencastName,
          finished: request.data.finished,
          time: request.data.time,
        };
        sendRequest(`${data.serverURL}screencast`, JSON.stringify(body));
      }
    });
    browser.storage.local.remove([
      'screencastId',
      'screencastName',
      'events',
      'widgets',
      'nextMetricNumber',
    ]);
  }
});

browser.runtime.onMessage.addListener(function (request) {
  if (request.message == 'save') {
    browser.storage.local.get('allEvents').then(function (data) {
      const allEvents = data.allEvents.concat(request.data.events);
      browser.storage.local.set({ allEvents: allEvents });
    });
  }
});

function sendRequest(url, data, callback) {
  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (callback) {
        callback(response);
      }
    });
}

function getCurrentTab(callback) {
  try {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      callback(tabs[0]);
    });
  } catch (err) {
    console.log('exception');
    console.log(err);
  }
}

browser.runtime.onMessage.addListener(function (request) {
  if (request.message == 'questionnaire') {
    browser.storage.local.get().then(function (options) {
      sendRequest(
        `${options.serverURL}questionnaire`,
        JSON.stringify(request.data)
      );
    });
  }
});

