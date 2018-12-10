var authorId = "tu_nombre";
var volunteer = "numero_de_voluntario";
var capturerServerURL = "http://localhost:1701/micrometrics/metrics/";
var widgets = {};

function getWidgetMicroMetrics(anElement) {
    metricId = anElement.getAttribute("data-metric-id");
    if (!metricId) {
        anElement.setAttribute("data-metric-id",getRandomID());
        metricId = anElement.getAttribute("data-metric-id");
    }
    if (!widgets[metricId]) {
        widgets[metricId] = {"id": metricId, "url": window.location.href, "authorId": authorId, "volunteer": volunteer};
        if (anElement.tagName.toLowerCase() == "input") {
            widgets[metricId] = Object.assign({}, widgets[metricId], {"widgetType": "TextInput", "typingLatency": 0, "typingSpeed": 0,
                "typingVariance": null,"totalTypingTime": 0, "correctionAmount": 0, "typingIntervals": []});
        }
        else {
            widgets[metricId] = Object.assign({}, widgets[metricId], {"widgetType": "SelectInput", "clicks": 0, "keystrokes": 0,
                "optionsSelected": 0,"focusTime": 0, "optionsDisplayTime": 0});
        }
    }
    return widgets[metricId];
}

function logMetrics(metrics) {
    metrics["timestamp"] = new Date().getTime();
    console.log(metrics);
    metrics["sent"] = false;
    $("title").text(metrics.id);
}

    var focusTime;
    var typingLatency;
    var typingSpeed;
    var charsTyped = 0;
    var alreadyTyped = false;
    var typingIntervals = [];
    var lastKeypressTimestamp = 0;
    var charsDeleted = 0;


    $("input").on('focus blur keypress keydown keyup', function (e) {
        switch (e.type) {
            case "focus":
                focusTime = e.timeStamp;
            case "keydown":
                if (e.keyCode === 8) {
                    getWidgetMicroMetrics(e.target).correctionAmount++;
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
                    getWidgetMicroMetrics(e.target).typingIntervals.push(intraKeypressInterval);
                }
                lastKeypressTimestamp = e.timeStamp;
                break;
            case "blur":
                if (charsTyped) {
    totalTypingTime = e.timeStamp - (focusTime + typingLatency);
    getWidgetMicroMetrics(e.target).totalTypingTime += totalTypingTime;
    getWidgetMicroMetrics(e.target).typingSpeed += totalTypingTime / charsTyped;
    getWidgetMicroMetrics(e.target).typingVariance = calculateVariance(getWidgetMicroMetrics(e.target).typingIntervals);
}
else {
    typingLatency = e.timeStamp - focusTime;
}
getWidgetMicroMetrics(e.target).typingLatency += typingLatency;
logMetrics(getWidgetMicroMetrics(e.target));
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

function calculateVariance(intervals) {
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

}

function getRandomID () {
    return  Math.random().toString(36).substring(2, 15);
}

function SelectMetrics() {
    var focusTime;
    var openTime;
    var optionsDisplayTime = 0;

    $("select").on("focus", function (e) {
        focusTime = e.timeStamp;
    });

    // triggered only when options box is opened
    $("select").on("mousedown", function (e) {
        openTime = e.timeStamp;
        getWidgetMicroMetrics(e.target).clicks++;
    });


    $("select").on("change", function (e) {
        getWidgetMicroMetrics(e.target).optionsSelected++;
        if (openTime) {
            getWidgetMicroMetrics(e.target).optionsDisplayTime += e.timeStamp - openTime;
        }
    });

    // only triggered when options box is closed
    $("select").on("keypress", function () {
        getWidgetMicroMetrics(e.target).keystrokes++;
    });

    $("select").on("blur", function (e) {
        var now = e.timeStamp;
        getWidgetMicroMetrics(e.target).focusTime += now - focusTime;
        logMetrics(getWidgetMicroMetrics(e.target));
    });
}

SelectMetrics();

window.onblur = function() {
    Object.keys(widgets).forEach(function(key) {
        if (!widgets[key].sent) {
            $.post(capturerServerURL, widgets[key]);
            widgets[key].sent = true;
        }
    });
};