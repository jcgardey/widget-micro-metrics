uploaded
screencastReplayerJs
	^ 'function getIframe() {
  return document.querySelector("div.replayer-wrapper iframe");
}

var lastValue = null;
function focusMicroMetric () {
  var iframe = getIframe();
  var micrometricId = iframe.contentDocument.querySelector("#micro-metric-id");
  if (micrometricId) {
    micrometricId = micrometricId.textContent;
    if (micrometricId != lastValue) {
        var allStrong = document.querySelectorAll("input.micrometricHiddenId");
        for(i=0; i < allStrong.length; i++) {
          if (allStrong[i].value == micrometricId) {
            allStrong[i].parentNode.classList.add("currentMetric");
				//scrollToSmoothly(allStrong[i].parentNode.offsetTop, 2000);
          }
          else if (allStrong[i].value == lastValue) {
            allStrong[i].parentNode.classList.remove("currentMetric");
          }
        }
        lastValue = micrometricId;
		      //$("button.svelte-1cgfpn0")[0].click();
  		  iframe.contentDocument.querySelectorAll("input,textarea").forEach(function(element){
        if(element === document.activeElement) {
            element.blur();
        }
    });
  }
  }
}


function scrollToSmoothly(pos, time) {
  /*Time is only applicable for scrolling upwards*/
  /*Code written by hev1*/
  /*pos is the y-position to scroll to (in pixels)*/
  var raterColumn = document.getElementById("metricsRaterColumn");
  var currentPos = raterColumn.scrollTop;
  var alreadyVisible = (pos > currentPos && (currentPos + raterColumn.clientHeight > pos));
  if (isNaN(pos)) {
    throw "Position must be a number";
  }
  if (pos < 0) {
    throw "Position can not be negative";
  }
  if (!alreadyVisible)  {
    if (currentPos < pos) {
      var t = 10;
      for (let i = currentPos; i <= pos; i += 10) {
        t += 10;
        setTimeout(function() { raterColumn.scrollTo(0, i);}, t / 2);
      }
    }
    else {
      time = time || 2;
      var i = currentPos;
      var x;
      x = setInterval(function() {
        raterColumn.scrollTo(0, i);
        i -= 10;
        if (i <= pos) {
          clearInterval(x);
        }
      }, time);
    }
  }
}

    $(document).ready(function () {
        if ($("#screencast_id").val()) {
            $.ajax({
              url: "', self screencastBaseUrl, '/micrometrics/screencast/" + $("#screencast_id").val(),
              method: ''get'',
              dataType: ''json'',
              success: function (response) {
                new rrwebPlayer({
                  target: document.querySelector("#replayer"), // customizable root element
                  data: {
                    events: response,
                    autoPlay: false,
                  },
                });
                setInterval(focusMicroMetric, 400);
                registerMicroMetricsEvents();
              }
            });
        }

    });


    function drawBoundingBox(element) {
        var iframe = getIframe();
        var doc = iframe.contentDocument;
        boundingBox = element.getBoundingClientRect();
        var margin = 5;
        var div = document.createElement("div");
        doc.body.appendChild(div);
        div.className = "currentFocus";
        div.style.position = "absolute";
        div.style.zIndex = "9999";
        div.style.top = boundingBox.top - margin + iframe.contentWindow.scrollY + "px";
        div.style.left = (boundingBox.left - margin + iframe.contentWindow.scrollX) + "px";
        div.style.width = boundingBox.width + (2 * margin) + "px";
        div.style.height = boundingBox.height + (2 * margin) + "px";
        div.style.backgroundColor = "rgba(253, 255, 134,0.6)";
    }

    function buildWidgetSelector(anElement) {
      var selector = anElement.tagName.toLowerCase();
      anElement.removeAttribute("data-metric-id");
      anElement.removeAttribute("widget-type");
      anElement.getAttributeNames().map(attribute => {
        selector += "[" + attribute + "=''";
        selector += anElement.getAttribute(attribute) + "'']";
      });
      return selector;
    }

    function parseWidget(html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        console.log(doc.body);
        return Array.from(doc.body.children);
    }

    function registerMicroMetricsEvents() {
      Array.from(document.querySelectorAll("div.panel-default")).map(div => {
          div.addEventListener("mouseenter", function () {
              /**
                var metricID = div.querySelector("input.micrometricHiddenId").value;
                var widget = getIframe().contentDocument.querySelector("[data-metric-id=''" + metricID + "'']");
                if (widget) {
                    // if the select wrapper is hidden, the native select box is pointed
                    if (widget.style.display == "none") {
                      target = widget.nextElementSibling;
                    }
                    else {
                      target = widget;
                    }
                    drawBoundingBox(target);
                }
                */
              var widgets = parseWidget(div.querySelector("input.micrometricHiddenHTML").value);
              widgets.map(element => {
                  var selector = buildWidgetSelector(element);
                  var targetWidget = getIframe().contentDocument.querySelector(selector);
                  if (targetWidget) {
                    drawBoundingBox(targetWidget);
                  }
              });
          });

          div.addEventListener("mouseleave", function () {
            var doc = getIframe().contentDocument;
            if (doc.querySelectorAll(".currentFocus")) {
              Array.from(doc.querySelectorAll(".currentFocus")).map(element => {
                  doc.body.removeChild(element);
              });
            }
          });
      });
    }
'