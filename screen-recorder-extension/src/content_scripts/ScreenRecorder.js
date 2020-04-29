function ScreenRecorder () {
    this.recording = false;
    this.events = [];

}

ScreenRecorder.prototype.toggleRecording = function () {
    if (!this.recording) {
        //modal.show();
        this.screencastId = Math.random().toString(36).substring(2, 15) + "-" + Date.now();
        this.screencastName = this.getNextID();
        browser.storage.local.set({"screencastId": this.screencastId});
        browser.storage.local.set({"screencastName": this.screencastId});
        this.startRecording();
    }
    else {
        this.pauseRecording();
        browser.storage.local.remove(["screencastId", "screencastName"]);
        browser.runtime.sendMessage({"message": "stop"});
    }
}

ScreenRecorder.prototype.pauseRecording = function () {
    this.stopScreencast();
    this.eventLogger.stopLogging();
    this.recording = false;
}

ScreenRecorder.prototype.getNextID = function () {
    var animals = ["ape","baboon","badger","bat","bear","bird","bobcat","bulldog","bullfrog","cat","catfish","cheetah","chicken","chipmunk","cobra","cougar","cow","crab","deer","dingo","dodo","dog","dolphin","donkey","dragon","dragonfly","duck","eagle","earwig","eel","elephant","emu","falcon","fireant","firefox","fish","fly","fox","frog","gecko","goat","goose","grasshopper","horse","hound","husky","impala","insect","jellyfish","kangaroo","ladybug","liger","lion","lionfish","lizard","mayfly","mole","monkey","moose","moth","mouse","mule","newt","octopus","otter","owl","panda","panther","parrot","penguin","pig","puma","pug","quail","rabbit","rat","rattlesnake","robin","seahorse","sheep","shrimp","skunk","sloth","snail","snake","squid","starfish","stingray","swan","termite","tiger","treefrog","turkey","turtle","vampirebat","walrus","warthog","wasp","wolverine","wombat","yak","zebra"];
    var animal = animals[Math.floor(Math.random()*animals.length)];

    var adjectives = ["afraid","ancient","angry","average","bad","big","bitter","black","blue","brave","breezy","bright","brown","calm","chatty","chilly","clever","cold","cowardly","cuddly","curly","curvy","dangerous","dry","dull","empty","evil","fast","fat","fluffy","foolish","fresh","friendly","funny","fuzzy","gentle","giant","good","great","green","grumpy","happy","hard","heavy","helpless","honest","horrible","hot","hungry","itchy","jolly","kind","lazy","light","little","loud","lovely","lucky","massive","mean","mighty","modern","moody","nasty","neat","nervous","new","nice","odd","old","orange","ordinary","perfect","pink","plastic","polite","popular","pretty","proud","purple","quick","quiet","rare","red","rotten","rude","selfish","serious","shaggy","sharp","short","shy","silent","silly","slimy","slippery","smart","smooth","soft","sour","spicy","splendid","spotty","stale","strange","strong","stupid","sweet","swift","tall","tame","tasty","tender","terrible","thin","tidy","tiny","tough","tricky","ugly","unlucky","warm","weak","wet","white","wicked","wise","witty","wonderful","yellow","young"];
    var adjective = adjectives[Math.floor(Math.random()*adjectives.length)];

    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    var randomNumber = firstPart + secondPart;
    return adjective + "_" + animal + "_" + randomNumber;
};

ScreenRecorder.prototype.startRecording = function () {
    this.events = [];
    this.recording = true;
    browser.runtime.sendMessage({"message": "start"});
    const me = this;
    this.stopScreencast = rrweb.record({
        emit(event) {
            me.events.push(event);
        },
    });

    this.eventLogger = new MicroMetricLogger(this.screencastId, this.screencastName, "http://localhost:1701/micrometrics/metrics/");
    this.eventLogger.startLogging();
};

ScreenRecorder.prototype.setUp = function () {
    const me = this;
    function pauseScreencast() {
        if (me.recording) {
            me.save();
            me.pauseRecording();
        }
    };
    window.onunload = pauseScreencast;
    window.onblur = pauseScreencast;
    // this function will send events to the backend and reset the events array
    setInterval(this.save.bind(this), 5000);
};

ScreenRecorder.prototype.save = function () {
    if (this.events.length > 0) {
        browser.runtime.sendMessage({"message":"save", "data":{"events": this.events, "screencastName": this.screencastName,
                "screencastId": this.screencastId, "url": document.location.href}});
        this.events = [];
    }
}

ScreenRecorder.prototype.checkExistingScreencast = function () {
    const me = this;
    browser.storage.local.get(["screencastId", "screencastName"]).then(function (data) {
        if (data.screencastId) {
            me.screencastId = data.screencastId;
            me.screencastName = data.screencastName;
            me.startRecording();
        }
    });
};

var screenRecorder = new ScreenRecorder();
screenRecorder.setUp();
screenRecorder.checkExistingScreencast();



browser.runtime.onMessage.addListener((request, sender) => {
    screenRecorder.toggleRecording();
});
