function ScreenRecorder () {
    this.recording = false;
    this.events = [];

}

ScreenRecorder.prototype.toggleRecording = function () {
    if (!this.recording) {
        modal.show();
    }
    else {
        this.stopRecording();
        this.recording = false;
        browser.runtime.sendMessage({"message": "stop"});
    }
}

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

};

ScreenRecorder.prototype.setUp = function () {
    // this function will send events to the backend and reset the events array
    const me = this;
    function save() {
        if (me.events.length > 0) {
            console.log('events pushed:', me.events);
            browser.runtime.sendMessage({"message":"save", "data":{"events": me.events, "screencastName": me.screencastName,
                    "screencastId": me.screencastId, "url": document.location.href}});
            me.events = [];
        }
    }
    setInterval(save, 10 * 1000);
};

var screenRecorder = new ScreenRecorder();
screenRecorder.setUp();
var modal = new RecorderModal(screenRecorder);

browser.runtime.onMessage.addListener((request, sender) => {
    screenRecorder.toggleRecording();
});

