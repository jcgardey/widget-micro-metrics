function getRandomID() {
    return Math.random().toString(36).substring(2, 15);
}

var widgets = {};


function assignWidgetID() {
    var allWidgets = document.querySelectorAll("input,select");
    for (var i = allWidgets.length - 1; i >= 0; i--) {
        var newId = getRandomID();
        allWidgets[i].setAttribute("data-metric-id", newId);
        widgets[newId] = {};
    }
}

function addEventListener(selector, event, handler) {
    var allElements = document.querySelectorAll(selector);
    for (var i = allElements.length - 1; i >= 0; i--) {
        allElements[i].addEventListener(event, handler);
    }
}

function updateMicroMetric(widget, metricName, value, sum) {
    if (widgets[widget.getAttribute("data-metric-id")][metricName] === undefined || !sum) {
        widgets[widget.getAttribute("data-metric-id")][metricName] = value;
    }
    else {
        widgets[widget.getAttribute("data-metric-id")][metricName] += value;
    }
}

function getWidgetMicroMetric(widget, metricName, defaultValue) {
    if (!widgets[widget.getAttribute("data-metric-id")][metricName]) {
        widgets[widget.getAttribute("data-metric-id")][metricName] = defaultValue;
        return defaultValue;
    }
    else {
        return widgets[widget.getAttribute("data-metric-id")][metricName];
    }
}

function typingLatency() {
    var focusTime;
    var alreadyTyped = false;
    var allTextInputs = document.querySelectorAll("input");

    addEventListener("input", "focus", function (e) {
        focusTime = e.timeStamp;
    });

    addEventListener("input", "keypress", function (e) {
        if (!alreadyTyped) {
            typingLatency = e.timeStamp - focusTime;
            console.log("typingLatency " + typingLatency);
            updateMicroMetric(e.target, "typingLatency", typingLatency, true);
            alreadyTyped = true;
        }
    });

    addEventListener("input", "blur", function (e) {
        alreadyTyped = false;
    });
}

function typingSpeed() {

    var startTime;
    var alreadyTyped = false;
    var charsTyped = 0;
    addEventListener("input", "keypress", function (e) {
        if (!alreadyTyped) {
            startTime = e.timeStamp;
            alreadyTyped = true;
        }
        charsTyped++;
    });

    addEventListener("input", "keydown", function (e) {
        // back character
        if (e.keyCode == 8) {
            charsTyped--;
            if (!startTime) {
                startTime = e.timeStamp;
            }
        }
    });

    addEventListener("input", "blur", function (e) {
        if (charsTyped) {
            var typingTime = e.timeStamp - startTime;
            console.log("typingTime " + typingTime);
            updateMicroMetric(e.target, "typingTime", typingTime, true);
            updateMicroMetric(e.target, "charsTyped", charsTyped, true);
            var typingSpeed = widgets[e.target.getAttribute("data-metric-id")].typingTime / widgets[e.target.getAttribute("data-metric-id")].charsTyped;
            updateMicroMetric(e.target, "typingSpeed", typingSpeed, false);
            alreadyTyped = false;
            charsTyped = 0;
            startTime = null;
        }
    });

}

function typingVariance() {
    var lastKeypressTimestamp = 0;

    addEventListener("input", "keypress", function (e) {
        if (lastKeypressTimestamp != 0) {
            var switchingTime = e.timeStamp;
            var intraKeypressInterval = switchingTime - lastKeypressTimestamp;
            getWidgetMicroMetric(e.target, "typingIntervals", []).push(intraKeypressInterval);
        }
        lastKeypressTimestamp = e.timeStamp;
    });

    addEventListener("input", "blur", function (e) {
        lastKeypressTimestamp = 0;
        updateMicroMetric(e.target, "typingVariance", standardDeviation(getWidgetMicroMetric(e.target, "typingIntervals", [])), false);
        console.log("typingVariance " + getWidgetMicroMetric(e.target, "typingVariance", null));
    });
}

function standardDeviation(intervals) {
    if (intervals.length == 0) {
        return null;
    }
    var total = 0;
    var total_power_of_two = 0;
    for (var i = intervals.length - 1; i >= 0; i--) {
        total += intervals[i];
        total_power_of_two += Math.pow(intervals[i], 2);
    }

    var media = total / intervals.length;
    var variance = (total_power_of_two / intervals.length) - Math.pow(media, 2);
    return Math.pow(variance, 1 / 2); // standard deviation

}

function mouseTraceLengthSpeed() {
    var currentWidget, lastWidget;
    var startingTop, startingLeft;
    var lastTop, lastLeft;
    var mouseTraceLength = 0;
    var lastMoveTimestamp, now;
    var mouseSpeeds = [];

    addEventListener("input, select", "focus", function (e) {
        currentWidget = e.target;
    });

    document.addEventListener("mousemove", function (e) {
        currentWidget = getMouseTargetWidget(e.pageX, e.pageY);
        if (currentWidget != lastWidget) {
            if (lastWidget) {
                updateMicroMetric(lastWidget, "mouseTraceLength", mouseTraceLength, true);
                console.log("Mouse trace length " + mouseTraceLength);
                console.log("Mouse speed " + calculateAverage(getWidgetMicroMetric(lastWidget, "mouseSpeeds", [])));
            }
            mouseTraceLength = 0;
            lastWidget = currentWidget;
            startingTop = e.pageY;
            startingLeft = e.pageX;
            lastTop = e.pageY;
            lastLeft = e.pageX;
            lastMoveTimestamp = e.timeStamp;
            mouseSpeeds = [];
        } else if (currentWidget) {
            var delta = Math.round(
                Math.sqrt(
                    Math.pow(lastTop - e.pageY, 2) +
                    Math.pow(lastLeft - e.pageX, 2)
                )
            );
            mouseTraceLength += delta;
            if (delta != 0) {
                lastTop = e.pageY;
                lastLeft = e.pageX;
                now = e.timeStamp;
                moveTime = (now - lastMoveTimestamp) / 1000;
                getWidgetMicroMetric(currentWidget, "mouseSpeeds", []).push(delta/moveTime);
                lastMoveTimestamp = now;
            }
        }
    });
}

function dwellTime() {

    var startTime, dwellTime;
    var currentWidget, lastWidget;

    addEventListener("input, select", "focus", function (e) {
       if (e.target != currentWidget) {
           currentWidget = e.target;
           var now = e.timeStamp;
           updateDwellTime(now);
           startTime = now;
           lastWidget = currentWidget;
       }
    });

    document.addEventListener("mousemove", function (e) {
        currentWidget = getMouseTargetWidget(e.pageX, e.pageY);
        if (currentWidget != lastWidget) {
            var now = e.timeStamp;
            updateDwellTime(now);
            startTime = now;
            lastWidget = currentWidget;
        }
    });

    function updateDwellTime(now) {
        if (lastWidget) {
            dwellTime = now - startTime;
            console.log("Dwell time " + dwellTime);
            updateMicroMetric(lastWidget, "dwellTime", dwellTime, true);
        }

    }
}

function getMouseTargetWidget(x, y) {
    var allWidgets = document.querySelectorAll("input, select");
    var currentWidget = null;
    for (var i = 0; i < allWidgets.length - 1; i++) {
        if (withinRectangle({x: x, y: y}, getWidgetSurroundings(allWidgets[i]))) {
            currentWidget = allWidgets[i];
        }
    }
    return currentWidget;
}

function withinRectangle(point, rectangle) {
    return (
        (point.x > rectangle.topLeft.x) && (point.x < rectangle.bottomRight.x) &&
        (point.y > rectangle.topLeft.y) && (point.y < rectangle.bottomRight.y)
    )
}

function getWidgetSurroundings(el) {
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
}

function calculateAverage(anArray) {
    var total = 0;
    for (let i = 0; i < anArray.length - 1; i++) {
        total += anArray[i];
    }
    return total / anArray.length;
}

assignWidgetID();
//typingLatency();
//typingSpeed();
//typingVariance();
//mouseTraceLengthSpeed();
dwellTime();

