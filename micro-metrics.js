var capturerServerURL = "http://localhost:1701/metrics/";
var previousElement;
var elementChanged;
var focusTime;
var typingLatency;
var typingSpeed;
var charsTyped = 0;
var alreadyTyped = false;
var typingIntervals = [];
var lastKeypressTimestamp = 0;
var charsDeleted = 0;


localStorage.setItem("metrics", JSON.stringify([]));

$("input").on('focus blur keypress keydown keyup', function (e) {
    /**if (typeof(previousElement) === "undefined") {
        previousElement = e.target;
        elementChanged = true;
    }
     else {
        elementChanged = (previousElement != e.target);
    }

     if (elementChanged) {
        focusTime = e.timeStamp;
    }*/
    // else {
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
            metrics = {
                "typingLatency": typingLatency,
                "totalTypingTime": totalTypingTime,
                "typingSpeed": typingSpeed,
                "typingVariance": calculateVariance(typingIntervals),
                "typingIntervals": typingIntervals,
                "correctionAmount": charsDeleted
            };

            $.post( capturerServerURL, metrics );

            var metrics_array = JSON.parse(localStorage.getItem("metrics"));
            metrics_array.push(metrics);
            localStorage.setItem("metrics", JSON.stringify(metrics_array));
            console.log(metrics);

            charsTyped = 0;
            alreadyTyped = false;
            typingIntervals = [];
            lastKeypressTimestamp = 0;
            charsDeleted = 0;
            break;
        default:
            null
        //    }
    }
    previousElement = e.target;
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

//SelectMetrics();


function SelectMetrics() {
    var clicks = 0;
    var keystrokes = 0;
    var optionsSelected = 0;
    var focusTime;
    var openTime;

    $("select").on("focus", function (e) {
        focusTime = e.timeStamp;
    });

    // triggered when options box is opened
    $("select").on("mousedown", function () {
        openTime = e.timeStamp;
        clicks++;
        console.log("clicks " + clicks);
    });

    // only triggered when options is closed
    $("select").on("keypress", function () {
        console.log("keypress");
        keystrokes++;
    });


    $("select").on("change", function () {

        optionsSelected++;
    });

    $("select").on("blur", function (e) {
        var now = e.timeStamp;
        console.log({"clicks": clicks, "keystrokes": keystrokes, "optionsSelected": optionsSelected,
            "focusTime": now - focusTime});
        clicks = 0;
        keystrokes = 0;
        optionsSelected = 0;
        focusTime = now;
    });


}
