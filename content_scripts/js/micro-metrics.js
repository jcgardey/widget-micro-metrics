//$("body").prepend("<div id='snackbar' style='z-index:1009;padding:20px;text-align:left;color:white;position:fixed;right:0;display:block;background:#333;display:none;'></div>");
var capturerServerURL = "http://localhost:1701/micrometrics/metrics/";

function logMetrics(metrics) {
    metrics["id"] = getRandomID();
    metrics["timestamp"] = new Date().getTime();
    $.post(capturerServerURL, metrics);
    console.log(metrics);
    //showSnackBar(metrics.id);
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
                    charsDeleted++;
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
                    typingIntervals.push(intraKeypressInterval);
                }
                lastKeypressTimestamp = e.timeStamp;
                break;
            case "blur":
                totalTypingTime = e.timeStamp - (focusTime + typingLatency);
                typingSpeed = totalTypingTime / charsTyped;

                // if typingLatency is undefined the others metrics are undefined too
                if (typingLatency) {
                    metrics = {
                        "widgetType": "TextInput",
                        "typingLatency": typingLatency,
                        "totalTypingTime": totalTypingTime,
                        "typingSpeed": typingSpeed,
                        "typingVariance": calculateVariance(typingIntervals),
                        "typingIntervals": typingIntervals,
                        "correctionAmount": charsDeleted
                    };
                    logMetrics(metrics);
                }
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
    var total = 0;
    var total_power_of_two = 0;
    $.each(intervals, function (i, interval) {
        total += interval;
        total_power_of_two += Math.pow(interval, 2);
    });
    var media = total / typingIntervals.length;
    var variance = (total_power_of_two / typingIntervals.length) - Math.pow(media, 2);
    return Math.pow(variance, 1 / 2); // standard deviation

}

function getRandomID () {
    return  Math.random().toString(36).substring(2, 15);
}

function showSnackBar(aMessage) {
    var snackbar = $($("#snackbar")[0]);
    snackbar.html(aMessage);
    snackbar.show();
    setTimeout(function(){ snackbar.hide(); }, 1500);
}


function SelectMetrics() {
    var clicks = 0;
    var keystrokes = 0;
    var optionsSelected = 0;
    var focusTime;
    var openTime;
    var optionsDisplayTime = 0;

    $("select").on("focus", function (e) {
        focusTime = e.timeStamp;
    });

    // triggered only when options box is opened
    $("select").on("mousedown", function (e) {
        openTime = e.timeStamp;
        clicks++;
    });


    $("select").on("change", function (e) {
        optionsSelected++;
        if (openTime) {
            optionsDisplayTime += e.timeStamp - openTime;
        }
    });

    // only triggered when options box is closed
    $("select").on("keypress", function () {
        keystrokes++;
    });

    $("select").on("blur", function (e) {
        var now = e.timeStamp;
        logMetrics({"widgetType": "SelectInput", "clicks": clicks, "keystrokes": keystrokes, "optionsSelected": optionsSelected,
            "focusTime": now - focusTime, "optionsDisplayTime": optionsDisplayTime});
        clicks = 0;
        keystrokes = 0;
        optionsSelected = 0;
        optionsDisplayTime = 0;
    });
}

SelectMetrics();
