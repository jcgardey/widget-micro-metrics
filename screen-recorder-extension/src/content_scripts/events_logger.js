function EventLogger(screencastId, volunteerName, serverURL) {
    this.screencastId = screencastId;
    this.volunteerName = volunteerName;
    this.serverURL = serverURL;
    this.widgets = {};
    this.nextID = 0;

}

EventLogger.prototype.getWidgetLogs = function (anElement) {
    metricId = anElement.getAttribute("data-metric-id");
    if (!metricId) {
        anElement.setAttribute("data-metric-id", this.getNextID());
        metricId = anElement.getAttribute("data-metric-id");
    }
    if (!this.widgets[metricId]) {
        this.widgets[metricId] = {
            "id": metricId,
            "url": window.location.href,
            "authorId": "",
            "volunteer": this.volunteerName,
            "interactions": 0
        };
        if (anElement.tagName.toLowerCase() == "input") {
            this.widgets[metricId] = Object.assign({}, this.widgets[metricId], {
                "widgetType": "TextInput",
                "typingLatency": 0,
                "typingSpeed": 0,
                "typingVariance": null,
                "totalTypingTime": 0,
                "correctionAmount": 0,
                "mouseTraceLength": 0,
                "typingIntervals": []
            });
        }
        else {
            this.widgets[metricId] = Object.assign({}, this.widgets[metricId], {
                "widgetType": "SelectInput", "clicks": 0, "keystrokes": 0,
                "optionsSelected": 0, "focusTime": 0, "optionsDisplayTime": 0, "mouseTraceLength": 0
            });
        }
    }
    return this.widgets[metricId];
};

EventLogger.prototype.logWidget = function (widgetLogs) {
    widgetLogs["timestamp"] = new Date().getTime();
    console.log(widgetLogs);
    widgetLogs["sent"] = false;
    widgetLogs["interactions"] += 1;

    var metricBar = document.createElement("div");
    metricBar.style.position = "fixed";
    metricBar.style.zIndex = "9999";
    metricBar.style.left = "30px";
    metricBar.style.top = "30px";
    metricBar.style.color = "#fff";
    metricBar.style.backgroundColor = "#333";
    metricBar.style.textAlign = "center";
    metricBar.style.padding = "10px";

    document.body.appendChild(metricBar);

    metricBar.textContent = widgetLogs.id;
    setTimeout(function(){ document.body.removeChild(metricBar); }, 3000);
};

EventLogger.prototype.withinRectangle = function (point, rectangle) {
    return (
        (point.x > rectangle.topLeft.x) && (point.x < rectangle.bottomRight.x) &&
        (point.y > rectangle.topLeft.y) && (point.y < rectangle.bottomRight.y)

    )
};

EventLogger.prototype.getOffset = function (el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
};

EventLogger.prototype.getWidgetSurroundings = function (el) {
    margin = 40;
    const rect = el.getBoundingClientRect();
    const left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;
    const right = rect.right + window.scrollX;
    const bottom = rect.bottom + window.scrollY;
    return {
        topLeft: {x: left - margin, y: top - margin},
        bottomRight: {x: right + margin, y: bottom + margin}
    };
};

EventLogger.prototype.setUpTextInput = function () {

    var focusTime;
    var typingLatency;
    var typingSpeed;
    var charsTyped = 0;
    var alreadyTyped = false;
    var typingIntervals = [];
    var lastKeypressTimestamp = 0;
    var charsDeleted = 0;

    var startingTop, startingLeft;
    var lastTop, lastLeft;
    var mouseTraceLength = 0;
    var currentWidget, currentWidgetCenter, lastWidget;
    var mouseBlur = null;

    var me = this;
    $(document).mousemove(function (e) {
        if (typeof(currentWidget) != "undefined") {
            if (currentWidget != lastWidget) {
                var centerX = me.getOffset(currentWidget).left + (currentWidget.offsetWidth / 2);
                var centerY = me.getOffset(currentWidget).top + (currentWidget.offsetHeight / 2);
                currentWidgetCenter = {x: centerX, y: centerY};
                startingTop = e.pageY;
                startingLeft = e.pageX;
                lastTop = e.pageY;
                lastLeft = e.pageX;
                mouseTraceLength = 0;
                lastWidget = currentWidget;
            }

            var delta = Math.round(
                Math.sqrt(
                    Math.pow(lastTop - e.pageY, 2) +
                    Math.pow(lastLeft - e.pageX, 2)
                )
            );

            lastTop = e.pageY;
            lastLeft = e.pageX;

            if (me.withinRectangle({x: e.pageX, y: e.pageY}, me.getWidgetSurroundings(currentWidget))) {
                mouseTraceLength += delta;
                mouseBlur = null;
            }
            else {
                mouseBlur = e.timeStamp;
            }
        }
    });

    $("input").on('focus blur keypress keydown keyup', function (e) {
        switch (e.type) {
            case "focus":
                focusTime = e.timeStamp;
                currentWidget = e.target;
            case "keydown":
                if (e.keyCode === 8) {
                    me.getWidgetLogs(e.target).correctionAmount++;
                }
                break;
            case "keypress":
                // keypress is fired with printable characters
                if (!alreadyTyped) {
                    typingLatency = e.timeStamp - focusTime;
                    alreadyTyped = true;
                }
                charsTyped++;
                if (lastKeypressTimestamp != 0) {
                    var switchingTime = e.timeStamp;
                    var intraKeypressInterval = switchingTime - lastKeypressTimestamp;
                    me.getWidgetLogs(e.target).typingIntervals.push(intraKeypressInterval);
                }
                lastKeypressTimestamp = e.timeStamp;
                break;
            case "blur":
                if (charsTyped) {
                    if (mouseBlur != null) {
                        lastFocusTime = mouseBlur;
                        mouseBlur = null;
                        console.log("Using MOUSE blur at: " + lastFocusTime);
                    }
                    else {
                        lastFocusTime = e.timeStamp;
                        console.log("Using REAL blur at: " + lastFocusTime);
                    }
                    totalTypingTime = lastFocusTime - (focusTime + typingLatency);
                    me.getWidgetLogs(e.target).totalTypingTime += totalTypingTime;
                    me.getWidgetLogs(e.target).typingSpeed += totalTypingTime / charsTyped;
                    me.getWidgetLogs(e.target).typingVariance = me.calculateVariance(me.getWidgetLogs(e.target).typingIntervals);
                }
                else {
                    typingLatency = e.timeStamp - focusTime;
                }
                me.getWidgetLogs(e.target).typingLatency += typingLatency;
                me.getWidgetLogs(e.target).mouseTraceLength += mouseTraceLength;
                me.logWidget(me.getWidgetLogs(e.target));
                charsTyped = 0;
                alreadyTyped = false;
                typingIntervals = [];
                lastKeypressTimestamp = 0;
                charsDeleted = 0;
                typingLatency = null;
                break;
            default:
                null
        }
    });
};

EventLogger.prototype.tearDownTextInput = function () {
    $(document).off('mousemove');
    $("input").off('focus blur keypress keydown keyup');
}

EventLogger.prototype.calculateVariance = function (intervals) {
    if (intervals.length == 0) {
        return null;
    }
    var total = 0;
    var total_power_of_two = 0;
    $.each(intervals, function (i, interval) {
        total += interval;
        total_power_of_two += Math.pow(interval, 2);
    });
    var media = total / intervals.length;
    var variance = (total_power_of_two / intervals.length) - Math.pow(media, 2);
    return Math.pow(variance, 1 / 2); // standard deviation
};

EventLogger.prototype.getNextID = function () {
    var id = this.volunteerName + "->" + this.nextID;
    this.nextID++;
    return id;
};

EventLogger.prototype.startLogging = function () {
    this.setUpTextInput();
};

EventLogger.prototype.stopLogging = function () {
    this.tearDownTextInput();
    console.log(this.widgets);
    browser.runtime.sendMessage({"message": "sendLogs", "url": this.serverURL, "logs": {"metrics": this.widgets, "screencastId": this.screencastId}});
};
