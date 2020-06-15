/************************************************************/
/****************** HTMLElement Extensions ******************/

/************************************************************/
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

HTMLElement.prototype.setMetricID = function (id) {
    this.setAttribute("data-metric-id", id);
}

HTMLElement.prototype.distanceToPoint = function (x, y) {
    let boundingBox = this.getBoundingClientRect();
    let rect = {
        max: {x: boundingBox.right, y: boundingBox.bottom},
        min: {x: boundingBox.left, y: boundingBox.top}
    };
    let point = {x: x, y: y};
    var dx = Math.max(rect.min.x - point.x, 0, point.x - rect.max.x);
    var dy = Math.max(rect.min.y - point.y, 0, point.y - rect.max.y);
    return Math.sqrt(dx * dx + dy * dy);
}

HTMLElement.prototype.getAbsoluteBoundingClientRect = function () {
    var rect = this.getBoundingClientRect();
    rect.x = rect.left + window.scrollX;
    rect.y = rect.top + window.scrollY;
    return rect;
}

HTMLElement.prototype.getWidgetSurroundings = function () {
    margin = 20;
    const rect = this.getAbsoluteBoundingClientRect();
    return rect.withPadding(margin);

};

HTMLElement.prototype.getHTML = function () {
    return this.outerHTML;
}

HTMLElement.prototype.getXPathCollection = function () {
    return [this.getXPath()];
}

HTMLElement.prototype.getXPath = function () {
    return new XPathInterpreter().getPath(this, document.body);
}

HTMLElement.prototype.getCenter = function () {
    const currentElementBox = this.getAbsoluteBoundingClientRect();
    return {x: currentElementBox.x + (currentElementBox.width / 2), y: currentElementBox.y + (currentElementBox.height / 2)}
};

HTMLElement.prototype.euclidianDistanceToElement = function (anotherElement) {
    return Math.sqrt( Math.pow(this.getCenter().x - anotherElement.getCenter().x, 2) + Math.pow(this.getCenter().y - anotherElement.getCenter().y, 2));
}

HTMLElement.prototype.closestLabel = function () {
    allLabels = Array.from(this.parentNode.parentNode.querySelectorAll('label'));
    return allLabels.reduce((min, current) => current.euclidianDistanceToElement(this) < min.euclidianDistanceToElement(this) ? current: min, allLabels[0]);
}

DOMRect.prototype.expandWith = function (anotherBoundingBox) {
    this.left = Math.min(this.left, anotherBoundingBox.left);
    this.top = Math.min(this.top, anotherBoundingBox.top);

    var newBottom = Math.max(this.bottom, anotherBoundingBox.bottom);
    this.height = newBottom - this.top;

    var newRight = Math.max(this.right, anotherBoundingBox.right);
    this.width = newRight - this.left;
}

DOMRect.prototype.withPadding = function (padding) {
    return new DOMRect(this.x - padding, this.y - padding, this.width + 2 * padding, this.height + 2 * padding)
}

DOMRect.prototype.includesPoint = function (x, y) {
    return (x >= this.left) && (x <= this.right) && (y >= this.top) && (y <= this.bottom);
}

Object.prototype.withinWidgetSurroundings = function (widget) {
    if (!widget) {
        return false;
    }
    var rectangle = widget.getWidgetSurroundings(widget);
    return rectangle.includesPoint(this.x, this.y);
}

Object.prototype.asArray = function () {
    return Object.keys(this).map(key => {
        return this[key]
    });
}

// intended for debbuging purposes
function drawBoundingBox(boundingBox) {
    if (document.querySelector("#currentFocus")) {
        document.body.removeChild(document.querySelector("#currentFocus"));
    }
    var div = document.createElement("div");
    document.body.appendChild(div);
    div.id = "currentFocus";
    div.style.position = "absolute";
    div.style.zIndex = "9999";
    div.style.top = boundingBox.top + "px";
    div.style.left = boundingBox.left + "px";
    div.style.width = boundingBox.width + "px";
    div.style.height = boundingBox.height + "px";
    div.style.border = "1px solid black";
}

/**
 var selectOpen = null;
 allSelects = document.getElementsByTagName('select');
 for(let select of allSelects) {
  select.addEventListener("mousedown", selectListener);
  select.addEventListener("change", changeListener);
}

 function selectListener(e){
  e.stopPropagation();
  let select = e.target;
  let selectBox = e.target.getAbsoluteBoundingClientRect();
  var options = document.createElement("div");
  select.optionsId = makeid(12);
  options.id = select.optionsId;
  options.style.position = "absolute";
  options.style.zIndex = "9999";
  options.style.left = selectBox.left+'px';
  options.style.top = (selectBox.top+5)+'px';
  options.style.width = (selectBox.width-5)+'px';
  options.style.backgroundColor = "#eee";
  options.style.padding = "5px 10px";
  options.style.borderRadius = "5px";
  options.style.fontSize = "12px";
  for (var i = 0; i < select.options.length; i++) {
    var option = document.createElement("p");
    option.style.padding = "0";
    option.style.margin = "0";
    option.textContent = select.options[i].textContent;
    options.appendChild(option);
  }
  document.body.appendChild(options);
  selectOpen = select;
}

 function changeListener(e){
  selectOpen = null;
  var options = document.getElementById(e.target.optionsId);
  document.body.removeChild(options);
}

 document.addEventListener("mousedown", function(e){
  if (selectOpen!=null) {
    var options = document.getElementById(selectOpen.optionsId);
    document.body.removeChild(options);
    selectOpen = null;
    console.log("selectOpen: ", selectOpen);
  }
}) */
/************************************************************/
/****************** End HTMLElement Extensions **************/

/************************************************************/

function initializeWidgetTypes() {
    // add widget-type attribute to text fields to differentiate from datepickers
    var allTextInputs = document.querySelectorAll("input[type='text']");
    for (let i = 0; i < allTextInputs.length; i++) {
        if (!allTextInputs[i].getAttribute("widget-type")) {
            allTextInputs[i].setAttribute("widget-type", "text");
        }
    }
    var allRadioSets = document.querySelectorAll('input[type=radio]');
    for (let i = 0; i < allRadioSets.length; i++) {
        if (!allRadioSets[i].getAttribute("widget-type")) {
            allRadioSets[i].setAttribute("widget-type", "radioset");
        }
    }
}

initializeWidgetTypes();


function WidgetLogs(widget) {
    this.metrics = {
        "id": null,
        "url": window.location.href,
        "authorId": "",
        "volunteer": "",
        "label": this.getWidgetLabel(widget),
        "interactions": 0,
        "hoverAndBack": 0,
        "exitAndBack": 0,
        "inputSwitches": 0,
        "mouseTraceLength": 0,
        "timestamp": new Date().getTime(),
        "mouseDwellTime": 0
    }
}

WidgetLogs.prototype.getMetrics = function () {
    return this.metrics;
}

WidgetLogs.prototype.getWidgetLabel = function (widget) {
    if (widget.getAttribute("placeholder")) {
        return widget.getAttribute("placeholder");
    }
    else if (widget.closestLabel()) {
        return widget.closestLabel().textContent;
    }
    else {
        return "";
    }
}

function TextInputLogs(widget) {
    WidgetLogs.call(this,widget);
    this.metrics = Object.assign({}, this.metrics, {
        "widgetType": "TextInput",
        "typingLatency": 0,
        "typingSpeed": 0,
        "typingVariance": null,
        "focusTime": 0,
        "correctionAmount": 0,
        "mouseTraceLength": 0,
        "typingIntervals": []
    });
}

TextInputLogs.prototype = Object.create(WidgetLogs.prototype);

function SelectInputLogs(widget) {
    WidgetLogs.call(this,widget);
    this.metrics = Object.assign({}, this.metrics, {
        "widgetType": widget.getAttribute("widget-type") == "select" ? "SelectInput" : "DateSelect",
        //"clicks": 0,
        //"keystrokes": 0,
        "optionsSelected": 0,
        //"focusTime": 0,
        "optionsDisplayTime": 0
    })
}

SelectInputLogs.prototype = Object.create(WidgetLogs.prototype);

function AnchorLogs(widget) {
    WidgetLogs.call(this,widget);
    this.metrics = Object.assign({}, this.metrics, {
        "widgetType": "Anchor",
        "misclicks": 0,
    })
}

AnchorLogs.prototype = Object.create(WidgetLogs.prototype);

AnchorLogs.prototype.getWidgetLabel = function (widget) {
    return widget.textContent;
}

function DatepickerLogs(widget) {
    WidgetLogs.call(this,widget);
    this.metrics = Object.assign({}, this.metrics, {
        "widgetType": "Datepicker",
        "selections": 0,
        "clicks": 0
    })
}

DatepickerLogs.prototype = Object.create(WidgetLogs.prototype);

function RadioSetLogs(widget) {
    WidgetLogs.call(this, widget);
    this.metrics = Object.assign({}, this.metrics, {
        "widgetType": "RadioSet",
        "hoverToFirstSelection": 0,
        "selections": 0,
        "clicks": 0
    })
}

RadioSetLogs.prototype = Object.create(WidgetLogs.prototype);

RadioSetLogs.prototype.getWidgetLabel = function (widget) {
    return widget.getLabel();
}

function MicroMetricLogger(screencastId, volunteerName, widgets, nextID) {
    this.screencastId = screencastId;
    this.volunteerName = volunteerName;
    this.widgets = widgets ? widgets: {};
    this.nextID = nextID ? nextID: 0;
    this.loggers = {
        text: TextInputLogs,
        select: SelectInputLogs,
        a: AnchorLogs,
        datepicker: DatepickerLogs,
        radioset: RadioSetLogs,
        "date-select": SelectInputLogs
    };
    this.widgetTypes = ["text","radio","datepicker","select", "a"];

    this.focusTime = new FocusTime(this);
    this.typingLatency = new TypingLatency(this);
    this.typingSpeed = new TypingSpeed(this);
    this.typingVariance = new TypingVariance(this);
    this.correctionAmount = new CorrectionAmount(this);
    this.mouseTraceLength = new MouseTraceLength(this);
    this.mouseDwellTime = new MouseDwellTime(this);
    this.hoverAndBack = new HoverAndBack(this);
    this.misClick = new MisClick(this);
    this.inputSwitch = new InputSwitch(this);
    this.interactions = new Interactions(this);
    this.hoverToFirstSelection = new HoverToFirstSelection(this);

    this.datepickerClicks = new DatepickerClicks(this);
    this.datepickerSelections = new DatepickerSelections(this);
    this.optionsDisplayTime = new SelectOptionsDisplayTime(this);
    this.optionsSelected = new OptionsSelected(this);
    this.radiosetMisClick = new RadioSetMisClick(this);
    this.radiosetSelection = new RadioSetSelection(this);
}

MicroMetricLogger.prototype.getWidgetLogs = function (anElement) {
    metricId = anElement.getAttribute("data-metric-id");
    if (!metricId) {
        anElement.setMetricID(this.getNextID());
        metricId = anElement.getAttribute("data-metric-id");
    }
    if (!this.widgets[metricId]) {
        var loggerName = anElement.getAttribute("widget-type") ? anElement.getAttribute("widget-type") : anElement.tagName.toLowerCase();
        if (this.loggers[loggerName]) {
            this.widgets[metricId] = new (this.loggers[loggerName])(anElement).getMetrics();
        }
        else {
            this.widgets[metricId] = new WidgetLogs(anElement).getMetrics();
        }
        this.widgets[metricId].html = anElement.getHTML();
        this.widgets[metricId].xpath = anElement.getXPathCollection();
        this.widgets[metricId].id = metricId;
        this.widgets.volunteer = this.volunteer;
    }
    return this.widgets[metricId];
}

MicroMetricLogger.prototype.logWidget = function (widget) {
    var widgetLogs = this.getWidgetLogs(widget);
    widgetLogs["timestamp"] = new Date().getTime();
    console.log(widgetLogs);
    widgetLogs["sent"] = false;

    var metricBar = document.createElement("div");
    metricBar.id = "micro-metric-id";
    metricBar.style.display = "none";
    metricBar.style.position = "fixed";
    metricBar.style.zIndex = "9999";
    metricBar.style.right = "30px";
    metricBar.style.top = "30px";
    metricBar.style.color = "#fff";
    metricBar.style.backgroundColor = "#333";
    metricBar.style.textAlign = "center";
    metricBar.style.padding = "10px";
    metricBar.style.fontSize = "20px";


    document.body.appendChild(metricBar);

    metricBar.textContent = widgetLogs.id;
    setTimeout(function () {
        document.body.removeChild(metricBar);
    }, 3000);
}

MicroMetricLogger.prototype.getNextID = function () {
    var id = this.volunteerName + "->" + this.nextID;
    this.nextID++;
    return id;
};

MicroMetricLogger.prototype.startLogging = function () {
    this.focusTime.setUp();
    this.typingLatency.setUp();
    this.typingSpeed.setUp();
    this.typingVariance.setUp();
    this.correctionAmount.setUp();
    this.mouseTraceLength.setUp();
    this.mouseDwellTime.setUp();
    this.hoverAndBack.setUp();
    this.misClick.setUp();
    this.inputSwitch.setUp();
    this.interactions.setUp();
    this.hoverToFirstSelection.setUp();

    this.datepickerClicks.setUp();
    this.datepickerSelections.setUp();
    this.optionsDisplayTime.setUp();
    this.optionsSelected.setUp();
    this.radiosetMisClick.setUp();
    this.radiosetSelection.setUp();
}

MicroMetricLogger.prototype.pauseLogging = function () {
    this.focusTime.tearDown();
    this.typingLatency.tearDown();
    this.typingSpeed.tearDown();
    this.typingVariance.tearDown();
    this.correctionAmount.tearDown();
    this.mouseTraceLength.tearDown();
    this.mouseDwellTime.tearDown();
    this.hoverAndBack.tearDown();
    this.misClick.tearDown();
    this.inputSwitch.tearDown();
    this.interactions.tearDown();
    this.hoverToFirstSelection.tearDown();

    this.datepickerClicks.tearDown();
    this.datepickerSelections.tearDown();
    this.optionsDisplayTime.tearDown();
    this.optionsSelected.tearDown();
    this.radiosetMisClick.tearDown();
    this.radiosetSelection.tearDown();
}

MicroMetricLogger.prototype.stopLogging = function () {
    this.pauseLogging();
    document.querySelectorAll('[data-metric-id]').forEach(function (element) {
        element.removeAttribute('data-metric-id')
    });
    console.log(JSON.stringify(this.widgets));
    /**
    browser.runtime.sendMessage({
        "message": "sendLogs",
        "logs": {"metrics": this.widgets, "screencastId": this.screencastId}
    });*/
    this.screencastId = null;
    this.volunteerName = null;
};

MicroMetricLogger.prototype.getMicroMetrics = function () {
    return this.widgets;
};

MicroMetricLogger.prototype.getRadioGroups = function () {
    if (!this.radioGroups) {
        this.radioGroups = [];
        allRadios = document.querySelectorAll('input[type="radio"]');
        for (let input of allRadios) {
            /*
            currentElementBox = input.getAbsoluteBoundingClientRect();
            inputX = currentElementBox.x + (currentElementBox.width / 2);
            inputY = currentElementBox.y + (currentElementBox.height / 2);

            allLabels = Array.from(document.getElementsByTagName('label'));
            closestLabel = allLabels.reduce((min, current) => current.distanceToPoint(inputX, inputY) < min.distanceToPoint(inputX, inputY) ? current : min, allLabels[0])
            */
            allLabels = Array.from(input.parentNode.parentNode.querySelectorAll("label"));
            closestLabel = allLabels.reduce((min, current) => current.euclidianDistanceToElement(input) < min.euclidianDistanceToElement(input) ? current : min, allLabels[0]);

            if (typeof(this.radioGroups[input.name]) == "undefined") {
                this.radioGroups[input.name] = new RadioGroup();
            }
            this.radioGroups[input.name].addElement(input);
            this.radioGroups[input.name].addElement(closestLabel);

        }
    }
    return this.radioGroups;
};

MicroMetricLogger.prototype.createDateSelects = function () {
    let dateSelects = [];
    Array.from(document.querySelectorAll("div[widget-type='date-select']")).map(dateSelect => {
        const dateSelectName = dateSelect.getAttribute("data-select-name");
        if (typeof(dateSelects[dateSelectName]) == "undefined") {
            dateSelects[dateSelectName] = new DateSelects();
        }
        dateSelects[dateSelectName].addElement(dateSelect);
    });
    return Object.keys(dateSelects).map(key => {
        return dateSelects[key];
    });
}

MicroMetricLogger.prototype.getDateSelects = function () {
    if (!this.dateSelects) {
        this.dateSelects = this.createDateSelects();
    }
    return this.dateSelects;
}


function addEventListener(selector, eventName, handler) {
    var targetElements = document.querySelectorAll(selector);
    for (var i = 0; i < targetElements.length; i++) {
        targetElements[i].addEventListener(eventName, handler);
    }
}

function removeEventListener(selector, eventName, handler) {
    var targetElements = document.querySelectorAll(selector);
    for (var i = 0; i < targetElements.length; i++) {
        targetElements[i].removeEventListener(eventName, handler);
    }
}

/********************************************************************************/
/********                                                                 *******/
/********                         MICROMETRICS                            *******/
/********                                                                 *******/

/********************************************************************************/


class MicroMetric {
    constructor(logger) {
        this.microMetricLogger = logger;
        this.targetElementsSelector = "input[widget-type='text'], input[widget-type='radio'], input[widget-type='datepicker'], div[widget-type='select'], a";
    }

    getCandidateWidgets() {
        let allWidgets = Array.from(document.querySelectorAll(this.targetElementsSelector)).concat(this.microMetricLogger.getRadioGroups().asArray()).concat(this.microMetricLogger.getDateSelects());
        let discardedWidgets = Array.from(document.querySelectorAll("[data-micrometric-logger='no-capture']"));
        return allWidgets.filter(element => !discardedWidgets.includes(element));
    }

    getTargetWidget = function (point) {
        for (var i = 0; i < this.getCandidateWidgets().length; i++) {
            if (point.withinWidgetSurroundings(this.getCandidateWidgets()[i])) {
                return this.getCandidateWidgets()[i];
            }
        }
        return null;
    }
}

class FocusTime extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.targetElements = "input[widget-type='text'], input[widget-type='radio']";
        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }

    setUp() {
        addEventListener(this.targetElements, "focus", this.focusHandler);
        addEventListener(this.targetElements, "blur", this.blurHandler);
        document.addEventListener("mousemove", this.mouseMoveHandler);
    }

    tearDown() {
        removeEventListener(this.targetElements, "focus", this.focusHandler);
        removeEventListener(this.targetElements, "blur", this.blurHandler);
        document.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    focusHandler(event) {
        this.currentWidget = event.target;
        this.startTime = event.timeStamp;
    }

    blurHandler(event) {
        if (!this.currentWidget) {
            return null;
        }
        if (this.mouseBlur) {
            console.log("Mouse blur");
        }
        else {
            this.blurTime = event.timeStamp;
            console.log("Real blur");
            this.focusTime = this.blurTime - this.startTime;
            this.logFocusTime();
        }

    }

    mouseMoveHandler(event) {
        if ({x: event.pageX, y: event.pageY}.withinWidgetSurroundings(this.currentWidget)) {
            this.mouseOnCurrentWidget = true;
            this.mouseBlur = null;
        }
        else {
            if (this.mouseOnCurrentWidget) {
                this.mouseBlur = event.timeStamp;
                this.focusTime = this.mouseBlur - this.startTime;
                this.logFocusTime();
                this.mouseOnCurrentWidget = false;
            }
        }
    }

    logFocusTime() {
        this.microMetricLogger.getWidgetLogs(this.currentWidget).focusTime += this.focusTime;
        this.microMetricLogger.logWidget(this.currentWidget);
    }
}

class TypingLatency extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.focusHandler = this.focusHandler.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
    }

    focusHandler(event) {
        this.alreadyTyped = false;
        this.startTime = event.timeStamp;
    }

    keyPressHandler(event) {
        if (!this.alreadyTyped) {
            this.typingLatency = event.timeStamp - this.startTime;
            this.microMetricLogger.getWidgetLogs(event.target).typingLatency += this.typingLatency;
            this.alreadyTyped = true;
        }
    }

    setUp() {
        addEventListener("input[widget-type='text']", "focus", this.focusHandler);
        addEventListener("input[widget-type='text']", "keypress", this.keyPressHandler);
    }

    tearDown() {
        removeEventListener("input[widget-type='text']", "focus", this.focusHandler);
        removeEventListener("input[widget-type='text']", "keypress", this.keyPressHandler);
    }
}

class TypingSpeed extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.charsTyped = 0;
    }

    setUp() {
        addEventListener("input[widget-type='text']", "keypress", this.keyPressHandler);
        addEventListener("input[widget-type='text']", "blur", this.blurHandler);
    }

    tearDown() {
        removeEventListener("input[widget-type='text']", "keypress", this.keyPressHandler);
        removeEventListener("input[widget-type='text']", "blur", this.blurHandler);
    }

    keyPressHandler(event) {
        if (this.charsTyped == 0) {
            this.startTime = event.timeStamp;
        }
        this.charsTyped++;
    }

    blurHandler(event) {
        if (this.charsTyped > 0) {
            this.typingSpeed = (event.timeStamp - this.startTime) / this.charsTyped;
            this.microMetricLogger.getWidgetLogs(event.target).typingSpeed += this.typingSpeed;
            this.charsTyped = 0;
        }
    }
}

class TypingVariance extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.lastKeypressTimestamp = 0;
    }

    setUp() {
        addEventListener("input[widget-type='text']", "keypress", this.keyPressHandler);
        addEventListener("input[widget-type='text']", "blur", this.blurHandler);
    }

    tearDown() {
        removeEventListener("input[widget-type='text']", "keypress", this.keyPressHandler);
        removeEventListener("input[widget-type='text']", "blur", this.blurHandler);
    }

    keyPressHandler(event) {
        if (this.lastKeypressTimestamp != 0) {
            var switchingTime = event.timeStamp;
            var intraKeypressInterval = switchingTime - this.lastKeypressTimestamp;
            this.microMetricLogger.getWidgetLogs(event.target).typingIntervals.push(intraKeypressInterval);
        }
        this.lastKeypressTimestamp = event.timeStamp;
    }

    standardDeviation(typingIntervals) {
        if (typingIntervals.length == 0) {
            return null;
        }
        var total = 0;
        var total_power_of_two = 0;
        for (var i = 0; i < typingIntervals.length; i++) {
            total += typingIntervals[i];
            total_power_of_two += Math.pow(typingIntervals[i], 2);
        }
        ;
        var media = total / typingIntervals.length;
        var variance = (total_power_of_two / typingIntervals.length) - Math.pow(media, 2);
        return Math.pow(variance, 1 / 2);
    }

    blurHandler(event) {
        var variance = this.standardDeviation(this.microMetricLogger.getWidgetLogs(event.target).typingIntervals);
        this.microMetricLogger.getWidgetLogs(event.target).typingVariance = variance;
        this.lastKeypressTimestamp = 0;
    }
}

class CorrectionAmount extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    setUp() {
        addEventListener("input[widget-type='text']", "keydown", this.keyDownHandler);
    }

    tearDown() {
        removeEventListener("input[widget-type='text']", "keydown", this.keyDownHandler);
    }

    keyDownHandler(event) {
        if (event.keyCode === 8) {
            this.microMetricLogger.getWidgetLogs(event.target).correctionAmount++;
        }
    }
}

class MouseTraceLength extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.currentWidget = null;
        this.lastWidget = null;
        this.lastTop = null;
        this.lastLeft = null;
        this.mouseTraceLength = 0;
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }

    setUp() {
        document.addEventListener("mousemove", this.mouseMoveHandler);
    }

    tearDown() {
        document.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    mouseMoveHandler(event) {
        this.currentWidget = this.getTargetWidget({x: event.pageX, y: event.pageY});
        if (this.currentWidget != this.lastWidget) {
            if (this.lastWidget) {
                //console.log("Trace length " + this.mouseTraceLength, "on ", this.lastWidget);
                this.microMetricLogger.getWidgetLogs(this.lastWidget).mouseTraceLength += this.mouseTraceLength;
            }
            this.lastTop = event.pageY;
            this.lastLeft = event.pageX;
            this.mouseTraceLength = 0;
            this.lastWidget = this.currentWidget;
        }
        var delta = Math.round(
            Math.sqrt(
                Math.pow(this.lastTop - event.pageY, 2) +
                Math.pow(this.lastLeft - event.pageX, 2)
            )
        );
        this.mouseTraceLength += delta;
        /*lastTop = event.pageY;
        lastLeft = event.pageX;*/
    }
}

class MouseDwellTime extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.dwellThreshold = 600;
    }

    setUp() {
        this.lastWidget = null;
        this.lastTimestamp = null;
        document.addEventListener("mousemove", this.mouseMoveHandler);
    }

    tearDown() {
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        this.updateDwellTime(Date.now());
    }

    updateDwellTime(now) {
        if (this.lastWidget) {
            var dwellTime = now - this.lastTimestamp;
            this.microMetricLogger.getWidgetLogs(this.lastWidget).mouseDwellTime += dwellTime;
            if (dwellTime >= this.dwellThreshold) {
                this.microMetricLogger.getWidgetLogs(this.lastWidget).interactions += 1;
                this.microMetricLogger.logWidget(this.lastWidget);
            }
        }
    }

    mouseMoveHandler(event) {
        this.currentWidget = this.getTargetWidget({x: event.pageX, y: event.pageY});
        if (this.currentWidget != this.lastWidget) {
            var now = event.timeStamp;
            this.updateDwellTime(now);
            this.lastWidget = this.currentWidget;
            this.lastTimestamp = now;
        }
    }
}

class Interactions extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.targetElementsSelector = "input[widget-type='text'],select,input[widget-type='datepicker']";
        this.focusHandler = this.focusHandler.bind(this);
    }

    setUp() {
        addEventListener(this.targetElementsSelector, "focus", this.focusHandler);
    }

    tearDown() {
        removeEventListener(this.targetElementsSelector, "focus", this.focusHandler);
    }

    focusHandler(event) {
        this.microMetricLogger.getWidgetLogs(event.target).interactions += 1;
        console.log("interactions ", this.microMetricLogger.getWidgetLogs(event.target).interactions);
    }
}

class MisClick extends MicroMetric {
    constructor(logger) {
        super(logger);
        this._toleranceDistance = 10;
        this.handler = this.handler.bind(this);
    }

    setUp() {
        document.addEventListener("click", this.handler);
    }

    tearDown() {
        document.removeEventListener("click", this.handler);
    }

    toleranceDistance() {
        return this._toleranceDistance;
    }

    handler(event) {
        let anchors = document.querySelectorAll('a');
        for (let anchor of anchors) {
            if (this.isCloseTo(event.clientX, event.clientY, anchor)) {
                this.microMetricLogger.getWidgetLogs(anchor).misclicks++;
                console.log(this.microMetricLogger.getWidgetLogs(anchor));
            }
        }
    }

    isCloseTo(x, y, element) {
        return element.distanceToPoint(x, y) < this.toleranceDistance();
    }

}

class HoverAndBack extends MicroMetric {
    constructor(logger) {
        super(logger);
        this._toleranceMs = 500;
        this._currentTrace = null;
        this._lastTrace = null;
        this._minimumTraceLength = 100;
        this.handler = this.handler.bind(this);
        this.stoppedMoving = this.stoppedMoving.bind(this);
        this._timeout = setTimeout(this.stoppedMoving, this.toleranceMs());
    }

    setUp() {
        document.addEventListener("mousemove", this.handler);
    }

    tearDown() {
        document.removeEventListener("mousemove", this.handler);
    }

    minimumTraceLength() {
        return this._minimumTraceLength;
    }

    timeout() {
        return this._timeout;
    }

    toleranceMs() {
        return this._toleranceMs;
    }

    currentTrace() {
        return this._currentTrace;
    }

    lastTrace() {
        return this._lastTrace;
    }

    handler(event) {
        clearTimeout(this.timeout());
        if (this.currentTrace() == null) this._currentTrace = new Trace();
        this.currentTrace().addPoint({x: event.clientX, y: event.clientY});
        this._timeout = setTimeout(this.stoppedMoving, this.toleranceMs());
    }

    stoppedMoving() {
        if (this.currentTrace() != null && this.currentTrace().traceLenght() > this.minimumTraceLength()) {
            this.currentTrace().close();
            if (this.lastTrace() != null) {
                var pathAngle = this.lastTrace().angleWith(this.currentTrace());
                if (this.currentTrace().straightness() > 0.8 && Math.abs(pathAngle) < 40) {
                    var targetElement = document.elementsFromPoint(this.lastTrace().endPoint().x, this.lastTrace().endPoint().y)[0];
                    if (this.microMetricLogger.widgetTypes.includes(targetElement.getAttribute("widget"))) {
                        this.microMetricLogger.getWidgetLogs(targetElement).hoverAndBack++;
                    }
                    var startElement = document.elementsFromPoint(this.lastTrace().startPoint().x, this.lastTrace().startPoint().y)[0];
                    var endElement = document.elementsFromPoint(this.currentTrace().endPoint().x, this.currentTrace().endPoint().y)[0];
                    if (this.microMetricLogger.widgetTypes.includes(startElement.getAttribute("widget")) && startElement == endElement) {
                        this.microMetricLogger.getWidgetLogs(startElement).exitAndBack++;
                    }
                }
            }
            this._lastTrace = this.currentTrace();
            this._currentTrace = null;
        }
    }

}

class InputSwitch extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.currentWidget = null;
        this.lastAction = null;
        this.focusHandler = this.focusHandler.bind(this);
        this.keypressHandler = this.keypressHandler.bind(this);
        this.mousemoveHandler = this.mousemoveHandler.bind(this);
    }

    setUp() {
        addEventListener("input[widget-type='text']", "focus", this.focusHandler);
        addEventListener("input[widget-type='text']", "keypress", this.keypressHandler);
        document.addEventListener("mousemove", this.mousemoveHandler);
    }

    tearDown() {
        removeEventListener("input[widget-type='text']", "focus", this.focusHandler);
        removeEventListener("input[widget-type='text']", "keypress", this.keypressHandler);
        document.removeEventListener("mousemove", this.mousemoveHandler);
    }

    focusHandler(event) {
        this.lastAction = null;
        this.currentWidget = event.target;
    }

    keypressHandler(event) {
        if (this.lastAction == "mousemove") {
            this.microMetricLogger.getWidgetLogs(this.currentWidget).inputSwitches++;
        }
        this.lastAction = "keypress";
    }

    mousemoveHandler(event) {
        if (this.lastAction == "keypress") {
            this.microMetricLogger.getWidgetLogs(this.currentWidget).inputSwitches++;
        }
        this.lastAction = "mousemove";
    }
}

class Trace {
    constructor() {
        this._empty = true;
        this._startTimestamp = (new Date()).getTime();
        this._endTimestamp = null;
        this.traces = [];
        this._traceLength = 0;
    }

    close() {
        this._endTimestamp = (new Date()).getTime();
    }

    isEmpty() {
        return this._empty;
    }

    startTimestamp() {
        return this._startTimestamp;
    }

    endTimestamp() {
        return this._endTimestamp;
    }

    startPoint() {
        return this.traces[0];
    }

    endPoint() {
        return this.traces[this.tracesCount() - 1];
    }

    straightLineLength() {
        return Math.round(Math.sqrt(
            Math.pow(this.endPoint().y - this.startPoint().y, 2) +
            Math.pow(this.endPoint().x - this.startPoint().x, 2)
        ));
    }

    traceLenght() {
        return this._traceLength;
    }

    straightness() {
        return this.straightLineLength() / this.traceLenght();
    }

    tracesCount() {
        return this.traces.length;
    }

    addPoint(point) {
        var microTrace = {delta: null, x: point.x, y: point.y};
        if (this.isEmpty()) {
            microTrace.delta = 0;
            this._empty = false;
        }
        else {
            microTrace.delta = Math.round(Math.sqrt(
                Math.pow(this.endPoint().y - point.y, 2) +
                Math.pow(this.endPoint().x - point.x, 2)
            ));
        }
        this._traceLength += microTrace.delta;
        this.traces.push(microTrace);
    }

    avgSpeed() {
        return this.traceLenght() / this.tracesCount();
    }

    angleWith(otherTrace) {
        var o1 = Math.atan2(this.endPoint().y - this.startPoint().y, this.endPoint().x - this.startPoint().x) * 180 / Math.PI;
        var o2 = Math.atan2(otherTrace.endPoint().y - otherTrace.startPoint().y, otherTrace.endPoint().x - otherTrace.startPoint().x) * 180 / Math.PI;
        if (o1 > 0) {
            var red = 180 - o1;
        }
        else {
            var red = 180 + o1;
        }
        var blue = o2 * (o1 / Math.abs(o1));
        return red + blue;
    }
}

class HoverToFirstSelection extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.moveHandler = this.moveHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this._current = null;
        this._hoverTimestamp = null;
    }

    setUp() {
        document.addEventListener("mousemove", this.moveHandler);
        addEventListener("input[type=radio]", "change", this.changeHandler);
    }

    tearDown() {
        document.removeEventListener("mousemove", this.moveHandler);
        removeEventListener("input[type=radio]", "change", this.changeHandler);
    }

    changeHandler(event) {
        let radioGroup = this.microMetricLogger.getRadioGroups()[event.target.name];
        if (this.microMetricLogger.getWidgetLogs(radioGroup).hoverToFirstSelection == 0)
            this.microMetricLogger.getWidgetLogs(radioGroup).hoverToFirstSelection = (new Date().getTime()) - this._hoverTimestamp;

    }

    moveHandler(event) {
        let point = {
            x: event.clientX + window.scrollX,
            y: event.clientY + window.scrollY
        };
        Object.keys(this.microMetricLogger.getRadioGroups()).forEach(function (radioGroupName, index) {
            let radioGroup = this.microMetricLogger.getRadioGroups()[radioGroupName];


            if (point.withinWidgetSurroundings(radioGroup)) {
                if (this._current != radioGroupName) {
                    // Mouse entering "radioGroupName"
                    this._current = radioGroupName;
                    this._hoverTimestamp = new Date().getTime();
                }
            }
            else {
                if (this._current == radioGroupName) {
                    // Mouse exiting "radioGroupName"
                    this._current = null;
                    //this.microMetricLogger.logWidget(this.microMetricLogger.getRadioGroups()[radioGroupName]);
                }
            }
        }, this)
    }
}

class RadioSetMisClick extends MicroMetric {

    constructor(logger) {
        super(logger);
        this.onClick = this.onClick.bind(this);
    }

    setUp() {
        document.addEventListener("click", this.onClick);
    }

    tearDown() {
        document.removeEventListener("click", this.onClick);
    }

    onClick(event) {
        let point = {
            x: event.clientX + window.scrollX,
            y: event.clientY + window.scrollY
        };
        Object.keys(this.microMetricLogger.getRadioGroups()).forEach(function (radioGroupName, index) {
            let radioGroup = this.microMetricLogger.getRadioGroups()[radioGroupName];
            if (radioGroup.boundingBox.includesPoint(point.x, point.y)) {
                if (event.target.type != "radio" && !event.target.getAttribute("for")) {
                    this.microMetricLogger.getWidgetLogs(radioGroup).clicks++;
                }
            }
        }, this);
    }
}

class RadioSetSelection extends MicroMetric {

    constructor(logger) {
        super(logger);
        this.onChange = this.onChange.bind(this);
    }

    setUp() {
        addEventListener("input[type=radio]", "change", this.onChange);
    }

    tearDown() {
        removeEventListener("input[type=radio]", "change", this.onChange);
    }

    onChange(event) {
        let radioGroup = this.microMetricLogger.getRadioGroups()[event.target.name];
        this.microMetricLogger.getWidgetLogs(radioGroup).selections++;
    }
}

class DatepickerMicroMetric extends MicroMetric {
    constructor(logger) {
        super(logger);
        this.onBlur = this.onBlur.bind(this);
        this.onCalendarClick = this.onCalendarClick.bind(this);
    }

    onBlur(event) {
        this.currentWidget = event.target;
        addEventListener("div.salsa-calendar[data-input-id='" + this.currentWidget.id +"']", "click", this.onCalendarClick);
    }

    onCalendarClick() {
    }

    setUp() {
        addEventListener("input[widget-type='datepicker']", "blur", this.onBlur);
    }

    tearDown() {
        removeEventListener("input[widget-type='datepicker']", "blur", this.onBlur);
        removeEventListener("div.salsa-calendar", "click", this.onCalendarClick);
    }
}

class DatepickerClicks extends DatepickerMicroMetric {

    constructor(logger) {
        super(logger);
    }

    onCalendarClick(event) {
        // discard date selections
        if (event.target.className.indexOf("sc-day") == -1) {
            this.microMetricLogger.getWidgetLogs(this.currentWidget).clicks += 1;
            console.log("clicks ", this.microMetricLogger.getWidgetLogs(this.currentWidget).clicks);
        }
    }

}

class DatepickerSelections extends DatepickerMicroMetric {

    constructor(logger) {
        super(logger);
    }

    onCalendarClick(event) {
        if (event.target.className.indexOf("sc-day") == 0) {
            this.microMetricLogger.getWidgetLogs(this.currentWidget).selections += 1;
            console.log("selections ", this.microMetricLogger.getWidgetLogs(this.currentWidget).selections);
            this.microMetricLogger.logWidget(this.currentWidget);
        }
    }
}

class SelectOptionsDisplayTime extends MicroMetric {

    constructor(logger) {
        super(logger);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    setUp() {
        addEventListener("div[widget-type='select'] .title, div[widget-type='date-select'] .title", "click", this.onClick);
        addEventListener("div[widget-type='select'], div[widget-type='date-select']", "change", this.onChange);
    }

    tearDown() {
        removeEventListener("div[widget-type='select'] .title, div[widget-type='date-select'] .title", "click", this.onClick);
        removeEventListener("div[widget-type='select'], div[widget-type='date-select']", "change", this.onChange);
    }

    onClick(event) {
        this.startTime = event.timeStamp;
    }

    getOptionsDisplayTime(event) {
        return event.timeStamp - this.startTime;
    }

    onChange(event) {
        this.microMetricLogger.getWidgetLogs(event.target).optionsDisplayTime += this.getOptionsDisplayTime(event);
    }
}

class OptionsSelected extends MicroMetric {

    constructor(logger) {
        super(logger);
        this.onChange = this.onChange.bind(this);
    }

    setUp() {
        addEventListener("div[widget-type='select'], div[widget-type='date-select']", "change", this.onChange);
    }

    tearDown() {
        removeEventListener("div[widget-type='select'],div[widget-type='date-select']", "change", this.onChange);
    }

    onChange() {
        this.microMetricLogger.getWidgetLogs(event.target).optionsSelected += 1;
    }

}
