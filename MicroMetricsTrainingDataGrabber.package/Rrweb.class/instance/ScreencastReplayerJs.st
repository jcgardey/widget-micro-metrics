uploaded
ScreencastReplayerJs
	^ '
    $(document).ready(function () {
            $.ajax({
              url: ''http://localhost:1701/micrometrics/screencast/'' + $("#screencast_id").val(),
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
              }
            });
      });
'