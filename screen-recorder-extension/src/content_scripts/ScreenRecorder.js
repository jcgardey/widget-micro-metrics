function ScreenRecorder () {
    this.recording = false;
    this.events = [];

}

ScreenRecorder.prototype.toggleRecording = function () {
    if (!this.recording) {
        //modal.show();
        this.screencastName = this.getNextID();
        console.log(this.screencastName);
        this.startRecording();
    }
    else {
        this.stopRecording();
        this.recording = false;
        this.eventLogger.stopLogging();
        browser.runtime.sendMessage({"message": "stop"});
    }
}

ScreenRecorder.prototype.getNextID = function () {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
};

ScreenRecorder.prototype.startRecording = function () {
    this.events = [];
    this.recording = true;
    this.screencastId = Math.random().toString(36).substring(2, 15) + "-" + Date.now();
    browser.runtime.sendMessage({"message": "start"});
    const me = this;
    this.stopRecording = rrweb.record({
        emit(event) {
            me.events.push(event);
        },
    });
    this.eventLogger = new MicroMetricLogger(this.screencastId, this.screencastName, "http://localhost:1701/micrometrics/metrics/");
    this.eventLogger.startLogging();
};

ScreenRecorder.prototype.setUp = function () {
    // this function will send events to the backend and reset the events array
    const me = this;
    function save() {
        if (me.events.length > 0) {
            browser.runtime.sendMessage({"message":"save", "data":{"events": me.events, "screencastName": me.screencastName,
                    "screencastId": me.screencastId, "url": document.location.href}});
            me.events = [];
        }
    }
    setInterval(save, 10 * 1000);
};

var screenRecorder = new ScreenRecorder();
screenRecorder.setUp();
//var modal = new RecorderModal(screenRecorder);

browser.runtime.onMessage.addListener((request, sender) => {
    screenRecorder.toggleRecording();
});

