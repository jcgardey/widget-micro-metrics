uploaded
screencastReplayerJs
	^ 'function getIframe() {
  return document.querySelector("div.replayer-wrapper iframe");
}

    $(document).ready(function () {
        if ($("#screencast_id").val()) {
            $.ajax({
              url: "', self screencastBaseUrl, '/micrometrics/screencast/" + $("#screencast_id").val(),
              method: ''get'',
              dataType: ''json'',
              success: function (response) {
                console.log(response);
                new rrwebPlayer({
                  target: document.querySelector("#replayer"), // customizable root element
                  data: {
                    events: response,
                    autoPlay: false,
                  },
                });
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

    function getElementByXpath(xpath, node) {
      var doc = (node && node.ownerDocument)? node.ownerDocument : node;
      var results = doc.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null);
      return results.iterateNext();
    };

    function registerMicroMetricsEvents() {
      Array.from(document.querySelectorAll("div.panel-default")).map(div => {
          div.addEventListener("mouseenter", function () {
              var widgetsXpath = div.querySelector("input.micrometricHiddenXpath").value.split("\n");
              widgetsXpath.map(elementXpath => {
                  var targetWidget = getElementByXpath(elementXpath,getIframe().contentDocument.body);
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