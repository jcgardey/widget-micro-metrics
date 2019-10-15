/************************************************************/
/****************** HTMLElement Extensions ******************/
/************************************************************/

HTMLElement.prototype.distanceToPoint = function(x,y) {
    let boundingBox = this.getBoundingClientRect();
    var xmin = boundingBox.left;
    var ymin = boundingBox.top;
    var xmax = boundingBox.right;
    var ymax = boundingBox.bottom;

    var rx = (xmin + xmax) / 2;
    var ry = (ymin + ymax) / 2;
    var rwidth = xmax - xmin;
    var rheight = ymax - ymin;

    var dx = Math.max(Math.abs(x - rx) - rwidth / 2, 0);
    var dy = Math.max(Math.abs(y - ry) - rheight / 2, 0);
    return dx * dx + dy * dy;
};

DOMRect.prototype.expandWith = function(anotherBoundingBox){
  this.left = Math.min(this.left, anotherBoundingBox.left);
  this.top = Math.min(this.top, anotherBoundingBox.top);

  var newBottom = Math.max(this.bottom, anotherBoundingBox.bottom);
  this.height = newBottom - this.top;

  var newRight = Math.max(this.right, anotherBoundingBox.right);
  this.width = newRight - this.left;
}

allInputs = document.getElementsByTagName('input');
radioGroups = [];
for(let input of allInputs) {
    if(input.type.toLowerCase() == 'radio') {
        currentElementBox = input.getBoundingClientRect();
        console.log(currentElementBox);
        if (typeof(radioGroups[input.name]) == "undefined") {
          radioGroups[input.name] = {boundingBox: currentElementBox, elements: []};
        }
        radioGroups[input.name].elements.push(input);
        radioGroups[input.name]['boundingBox'].expandWith(currentElementBox);
    }
}

/************************************************************/
/****************** End HTMLElement Extensions **************/
/************************************************************/


function WidgetLogs () {
  this.metrics = {
    "id": null,
    "url": window.location.href,
    "authorId": "",
    "volunteer": "",
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

function TextInputLogs() {
    WidgetLogs.call(this);
    this.metrics = Object.assign({ }, this.metrics, {
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
TextInputLogs.prototype = Object.create(WidgetLogs.prototype);

function SelectInputLogs() {
  WidgetLogs.call(this);
  this.metrics = Object.assign({}, this.metrics, {
                "widgetType": "SelectInput",
                "clicks": 0,
                "keystrokes": 0,
                "optionsSelected": 0,
                "focusTime": 0,
                "optionsDisplayTime": 0
              })
}
SelectInputLogs.prototype = Object.create(WidgetLogs.prototype);

function AnchorLogs() {
  WidgetLogs.call(this);
  this.metrics = Object.assign({}, this.metrics, {
                "widgetType": "Anchor",
                "misclicks": 0,
              })
}
AnchorLogs.prototype = Object.create(WidgetLogs.prototype);

function MicroMetricLogger(screencastId, volunteerName, serverURL) {
    this.screencastId = screencastId;
    this.volunteerName = volunteerName;
    this.serverURL = serverURL;
    this.widgets = {};
    this.nextID = 0;
    this.loggers = { input: TextInputLogs, select: SelectInputLogs, a: AnchorLogs};

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
}

MicroMetricLogger.prototype.getWidgetLogs = function (anElement) {
  metricId = anElement.getAttribute("data-metric-id");
    if (!metricId) {
        anElement.setAttribute("data-metric-id", this.getNextID());
        metricId = anElement.getAttribute("data-metric-id");
    }
    if (!this.widgets[metricId]) {
        if (this.loggers[anElement.tagName.toLowerCase()]) {
            this.widgets[metricId] = new (this.loggers[anElement.tagName.toLowerCase()])().getMetrics();
        }
        else {
          this.widgets[metricId] = new WidgetLogs().getMetrics();
        }
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
}

MicroMetricLogger.prototype.stopLogging = function () {
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
  document.querySelectorAll('[data-metric-id]').forEach(function(element){element.removeAttribute('data-metric-id')});
  console.log(this.widgets);
  browser.runtime.sendMessage({"message": "sendLogs", "url": this.serverURL, "logs": {"metrics": this.widgets, "screencastId": this.screencastId}});
  this.screencastId = null;
  this.volunteerName = null;
}


function addEventListener(selector, eventName, handler) {
    var targetElements = document.querySelectorAll(selector);
    for(var i=0; i < targetElements.length; i++) {
        targetElements[i].addEventListener(eventName, handler);
    }
}

function removeEventListener (selector, eventName, handler) {
    var targetElements = document.querySelectorAll(selector);
    for(var i=0; i < targetElements.length; i++) {
        targetElements[i].removeEventListener(eventName, handler);
    }
}

function getWidgetSurroundings(el) {
  margin = 40;
  const rect = el.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const top = rect.top + window.scrollY;
  const right = rect.right + window.scrollX;
  const bottom = rect.bottom + window.scrollY;
  return {
    topLeft: { x:left - margin, y:top - margin},
    bottomRight: { x:right + margin, y:bottom + margin}
  };
}

function withinWidgetSurroundings(point, widget) {
  if (!widget) {
    return false;
  }
  var rectangle = getWidgetSurroundings(widget);
  return (
            (point.x > rectangle.topLeft.x) && (point.x < rectangle.bottomRight.x) &&
            (point.y > rectangle.topLeft.y) && (point.y < rectangle.bottomRight.y)

          )
}

function MicroMetric(logger) {
  this.microMetricLogger = logger;
  this.targetElementsSelector = "input, select, a";
}

MicroMetric.prototype.getTargetWidget = function (point) {
  var targetElements = document.querySelectorAll(this.targetElementsSelector);
  for(var i=0; i < targetElements.length;i++) {
    if (withinWidgetSurroundings(point,targetElements[i])) {
      return targetElements[i];
    }
  }
  return null;
}


function FocusTime(logger) {
    MicroMetric.call(this, logger);
    this.targetElements = "input,select";
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
}


FocusTime.prototype.onFocus = function (event) {
    this.currentWidget = event.target;
    this.startTime = event.timeStamp;
}

FocusTime.prototype.onBlur = function (event) {
    if (this.mouseBlur) {
      this.blurTime = this.mouseBlur;
      this.mouseBlur = null;
      console.log("Mouse blur");
    }
    else {
      this.blurTime = event.timeStamp;
      console.log("Real blur");
    }
    this.focusTime = this.blurTime - this.startTime;
    this.microMetricLogger.getWidgetLogs(this.currentWidget).totalTypingTime += this.focusTime;
    this.microMetricLogger.logWidget(this.currentWidget);
}

FocusTime.prototype.onMouseMove = function (event) {
    if (withinWidgetSurroundings({ x: event.pageX, y: event.pageY},this.currentWidget)) {
        this.mouseOnCurrentWidget = true;
        this.mouseBlur = null;
    }
    else {
      if (this.mouseOnCurrentWidget) {
        this.mouseBlur = event.timeStamp;
        this.mouseOnCurrentWidget = false;
      }
    }
}

FocusTime.prototype.setUp = function () {
  addEventListener(this.targetElements,"focus", this.onFocus);
  addEventListener(this.targetElements,"blur", this.onBlur);
  document.addEventListener("mousemove", this.onMouseMove);
}

FocusTime.prototype.tearDown = function () {
  removeEventListener(this.targetElements,"focus", this.onFocus);
  removeEventListener(this.targetElements,"blur", this.onBlur);
  document.removeEventListener("mousemove", this.onMouseMove);
}

function TypingLatency (logger) {
  MicroMetric.call(this, logger);
  this.onFocus = this.onFocus.bind(this);
  this.onKeyPress = this.onKeyPress.bind(this);
}

TypingLatency.prototype.onFocus = function (event) {
    this.alreadyTyped = false;
    this.startTime = event.timeStamp;
}

TypingLatency.prototype.onKeyPress = function (event) {
  if (!this.alreadyTyped) {
      this.typingLatency = event.timeStamp - this.startTime;
      this.microMetricLogger.getWidgetLogs(event.target).typingLatency += this.typingLatency;
      this.alreadyTyped = true;
  }
}

TypingLatency.prototype.setUp = function () {
  addEventListener("input", "focus", this.onFocus);
  addEventListener("input", "keypress", this.onKeyPress);
}

TypingLatency.prototype.tearDown = function () {
  removeEventListener("input", "focus", this.onFocus);
  removeEventListener("input", "keypress", this.onKeyPress);
}


function TypingSpeed (logger) {
  MicroMetric.call(this, logger);
  this.onKeyPress = this.onKeyPress.bind(this);
  this.onBlur = this.onBlur.bind(this);
  this.charsTyped = 0;
}

TypingSpeed.prototype.onKeyPress = function (event) {
  if (this.charsTyped == 0) {
    this.startTime = event.timeStamp;
  }
  this.charsTyped++;
}

TypingSpeed.prototype.onBlur = function (event) {
  if (this.charsTyped > 0) {
    this.typingSpeed = (event.timeStamp - this.startTime) / this.charsTyped;
    this.microMetricLogger.getWidgetLogs(event.target).typingSpeed += this.typingSpeed;
    this.charsTyped = 0;
  }
}

TypingSpeed.prototype.setUp = function () {
  addEventListener("input","keypress", this.onKeyPress);
  addEventListener("input", "blur", this.onBlur);
}

TypingSpeed.prototype.tearDown = function () {
  removeEventListener("input", "keypress", this.onKeyPress);
  removeEventListener("input", "blur", this.onBlur);
}

function TypingVariance (logger) {
  MicroMetric.call(this, logger);
  this.onKeyPress = this.onKeyPress.bind(this);
  this.onBlur = this.onBlur.bind(this);
  this.lastKeypressTimestamp = 0;
}

TypingVariance.prototype.onKeyPress = function (event) {
  if (this.lastKeypressTimestamp != 0) {
      var switchingTime = event.timeStamp;
      var intraKeypressInterval = switchingTime - this.lastKeypressTimestamp;
      this.microMetricLogger.getWidgetLogs(event.target).typingIntervals.push(intraKeypressInterval);
  }
  this.lastKeypressTimestamp = event.timeStamp;
}

TypingVariance.prototype.standardDeviation = function (typingIntervals) {
  if (typingIntervals.length == 0) {
      return null;
  }
  var total = 0;
  var total_power_of_two = 0;
  for (var i=0; i < typingIntervals.length;i++) {
      total += typingIntervals[i];
      total_power_of_two += Math.pow(typingIntervals[i], 2);
  };
  var media = total / typingIntervals.length;
  var variance = (total_power_of_two / typingIntervals.length) - Math.pow(media, 2);
  return Math.pow(variance, 1 / 2);
}

TypingVariance.prototype.onBlur = function (event) {
  var variance = this.standardDeviation(this.microMetricLogger.getWidgetLogs(event.target).typingIntervals);
  this.microMetricLogger.getWidgetLogs(event.target).typingVariance = variance;
  this.lastKeypressTimestamp = 0;
}

TypingVariance.prototype.setUp = function () {
  addEventListener("input","keypress", this.onKeyPress);
  addEventListener("input", "blur", this.onBlur);
}

TypingVariance.prototype.tearDown = function () {
  removeEventListener("input", "keypress", this.onKeyPress);
  removeEventListener("input", "blur", this.onBlur);
}

function CorrectionAmount(logger) {
  MicroMetric.call(this, logger);
  this.onKeyDown = this.onKeyDown.bind(this);
  //this.onBlur = this.onBlur.bind(this);
}

CorrectionAmount.prototype.onKeyDown = function (event) {
  if (event.keyCode === 8) {
      this.microMetricLogger.getWidgetLogs(event.target).correctionAmount++;
  }
}

CorrectionAmount.prototype.onBlur = function (event) {
  console.log("Correction amount " + this.correctionAmount);
  this.correctionAmount = 0;
}

CorrectionAmount.prototype.setUp = function () {
  addEventListener("input","keydown", this.onKeyDown);
  //addEventListener("input", "blur", this.onBlur);
}

CorrectionAmount.prototype.tearDown = function () {
  removeEventListener("input", "keydown", this.onKeyDown);
  //removeEventListener("input", "blur", this.onBlur);
}

function MouseTraceLength (logger) {
    MicroMetric.call(this, logger);
    this.currentWidget = null;
    this.lastWidget = null;
    this.mouseTraceLength = 0;
    this.onMouseMove = this.onMouseMove.bind(this);
}
MouseTraceLength.prototype = Object.create(MicroMetric.prototype);

MouseTraceLength.prototype.onMouseMove = function (event) {
    this.currentWidget = this.getTargetWidget({ x:event.pageX, y:event.pageY});
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
    lastTop = event.pageY;
    lastLeft = event.pageX;
}

MouseTraceLength.prototype.setUp = function () {
  document.addEventListener("mousemove", this.onMouseMove);
}

MouseTraceLength.prototype.tearDown = function () {
  document.removeEventListener("mousemove", this.onMouseMove);
}

function MouseDwellTime (logger) {
    MicroMetric.call(this, logger);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.lastWidget = null;
    this.lastTimestamp = null;
}

MouseDwellTime.prototype = Object.create(MicroMetric.prototype);

MouseDwellTime.prototype.onMouseMove = function (event) {
  this.currentWidget = this.getTargetWidget({ x:event.pageX, y:event.pageY});
  if (this.currentWidget != this.lastWidget) {
    var now = event.timeStamp;
    if (this.lastWidget) {
        var dwellTime = now - this.lastTimestamp;
        this.microMetricLogger.getWidgetLogs(this.lastWidget).mouseDwellTime += dwellTime;
    }
    this.lastWidget = this.currentWidget;
    this.lastTimestamp = now;
  }
}

MouseDwellTime.prototype.setUp = function () {
  document.addEventListener("mousemove", this.onMouseMove);
}

MouseDwellTime.prototype.tearDown = function () {
  document.removeEventListener("mousemove", this.onMouseMove);
}

function Interactions (logger) {
    MicroMetric.call(this, logger);
    this.targetElementsSelector = "input, select";
    this.onFocus = this.onFocus.bind(this);
}

Interactions.prototype.onFocus = function (event) {
  this.microMetricLogger.getWidgetLogs(event.target).interactions += 1;
  console.log("interactions ", this.microMetricLogger.getWidgetLogs(event.target).interactions);
}

Interactions.prototype.setUp = function () {
  addEventListener(this.targetElementsSelector, "focus", this.onFocus);
}

Interactions.prototype.tearDown = function () {
  removeEventListener(this.targetElementsSelector, "focus", this.onFocus);
}

class MisClick extends MicroMetric {
    constructor(logger) {
      	super(logger);
        this._toleranceDistance = 500;
        this.handler = this.handler.bind(this);
    }

    setUp() {
      document.addEventListener("click", this.handler);
    }

    tearDown() {
      document.removeEventListener("click", this.handler);
    }

    toleranceDistance(){
      return this._toleranceDistance;
    }

    handler(event){
      let anchors = document.querySelectorAll('a');
      for(let anchor of anchors){
        if (this.isCloseTo(event.clientX, event.clientY, anchor)) {
          this.microMetricLogger.getWidgetLogs(anchor).misclicks++;
          console.log(this.microMetricLogger.getWidgetLogs(anchor));
        }
      }
    }

    isCloseTo(x, y, element){
      return element.distanceToPoint(x,y) < this.toleranceDistance();
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

    minimumTraceLength(){
      return this._minimumTraceLength;
    }
    timeout(){
      return this._timeout;
    }
    toleranceMs(){
      return this._toleranceMs;
    }
    currentTrace(){
      return this._currentTrace;
    }
    lastTrace(){
      return this._lastTrace;
    }

    handler( event ) {
       clearTimeout(this.timeout());
       if (this.currentTrace() == null) this._currentTrace = new Trace();
       this.currentTrace().addPoint({ x: event.clientX, y: event.clientY});
       this._timeout = setTimeout(this.stoppedMoving, this.toleranceMs());
    }

    stoppedMoving(){
      if (this.currentTrace() != null && this.currentTrace().traceLenght() > this.minimumTraceLength()) {
        this.currentTrace().close();
        if (this.lastTrace() != null) {
          var pathAngle = this.lastTrace().angleWith(this.currentTrace());
          if(this.currentTrace().straightness()>0.8 && Math.abs(pathAngle)<40) {
            var targetElement = document.elementsFromPoint(this.lastTrace().endPoint().x,this.lastTrace().endPoint().y)[0];
						if (targetElement.tagName == "INPUT" || targetElement.tagName == "SELECT" || targetElement.tagName == "A") {
								this.microMetricLogger.getWidgetLogs(targetElement).hoverAndBack++;
						}
            var startElement = document.elementsFromPoint(this.lastTrace().startPoint().x,this.lastTrace().startPoint().y)[0];
            var endElement = document.elementsFromPoint(this.currentTrace().endPoint().x,this.currentTrace().endPoint().y)[0];
            if ((startElement.tagName == "INPUT" || startElement.tagName == "SELECT" || targetElement.tagName == "A") && (startElement == endElement))
              this.microMetricLogger.getWidgetLogs(startElement).exitAndBack++;
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
		addEventListener("input", "focus", this.focusHandler);
		addEventListener("input", "keypress", this.keypressHandler);
		document.addEventListener("mousemove", this.mousemoveHandler);
  }

  tearDown() {
    removeEventListener("input", "focus", this.focusHandler);
    removeEventListener("input", "keypress", this.keypressHandler);
    document.removeEventListener("mousemove", this.mousemoveHandler);
  }

	focusHandler( event ) {
			this.lastAction = null;
			this.currentWidget = event.target;
	}

	keypressHandler( event ) {
			if (this.lastAction == "mousemove") {
				this.microMetricLogger.getWidgetLogs(this.currentWidget).inputSwitches++;
			}
			this.lastAction = "keypress";
	}

	mousemoveHandler( event ) {
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
    close(){
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
        return Math.round( Math.sqrt(
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
    tracesCount(){
        return this.traces.length;
    }
    addPoint(point){
        var microTrace = { delta : null , x : point.x , y : point.y };
        if (this.isEmpty()) {
          microTrace.delta = 0;
          this._empty = false;
        }
        else{
          microTrace.delta = Math.round( Math.sqrt(
            Math.pow(this.endPoint().y - point.y, 2) +
            Math.pow(this.endPoint().x - point.x, 2)
          ));
        }
        this._traceLength += microTrace.delta;
        this.traces.push(microTrace);
    }
    avgSpeed(){
      return this.traceLenght() / this.tracesCount();
    }
    angleWith(otherTrace){
      var o1 = Math.atan2(this.endPoint().y - this.startPoint().y, this.endPoint().x - this.startPoint().x) * 180 / Math.PI;
      var o2 = Math.atan2(otherTrace.endPoint().y - otherTrace.startPoint().y, otherTrace.endPoint().x - otherTrace.startPoint().x) * 180 / Math.PI;
      if (o1>0) {
        var red = 180 - o1;
      }
      else{
        var red = 180 + o1;
      }
      var blue = o2 * (o1 / Math.abs(o1));
      return red + blue;
    }
}
