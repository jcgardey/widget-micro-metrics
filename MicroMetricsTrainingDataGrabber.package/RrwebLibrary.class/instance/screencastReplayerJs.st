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
        var allStrong = document.querySelectorAll("div.panel-heading strong");
        for(i=0; i < allStrong.length; i++) {
          if (allStrong[i].textContent == micrometricId) {
            allStrong[i].parentNode.classList.add("currentMetric");;
          }
          else if (allStrong[i].textContent == lastValue) {
            allStrong[i].parentNode.classList.remove("currentMetric");
          }
        }
        lastValue = micrometricId;
		  $("button.svelte-1cgfpn0")[0].click();
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