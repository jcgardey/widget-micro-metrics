uploaded
screencastReplayerJs
	^ '
var lastValue = null;
function focusMicroMetric () {
  var iframe = document.querySelector("div.replayer-wrapper iframe");
  var micrometricId = iframe.contentDocument.querySelector("#micro-metric-id");
  if (micrometricId) {
    micrometricId = micrometricId.textContent;
    if (micrometricId != lastValue) {
        var allStrong = document.querySelectorAll("input.micrometricHiddenId");
        for(i=0; i < allStrong.length; i++) {
          if (allStrong[i].value == micrometricId) {
            allStrong[i].parentNode.classList.add("currentMetric");
				scrollToSmoothly(allStrong[i].parentNode.offsetTop, 2000);
          }
          else if (allStrong[i].value == lastValue) {
            allStrong[i].parentNode.classList.remove("currentMetric");
          }
        }
        lastValue = micrometricId;
		  $("button.svelte-1cgfpn0")[0].click();
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
              url: ''',self screencastBaseUrl,'/micrometrics/screencast/'' + $("#screencast_id").val(),
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
              }
            });
        }
    });
'