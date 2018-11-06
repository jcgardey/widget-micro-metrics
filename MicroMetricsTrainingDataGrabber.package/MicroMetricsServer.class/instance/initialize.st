initialization
initialize
	super initialize.
	grabbers := Dictionary new.
	grabbers at: #TextInput put: TextInputGrabber new.
	grabbers at: #SelectInput put: SelectInputGrabber new.
	
	server := Teapot on
		GET: '/micrometrics/ping' -> 'pong';
		GET: '/micrometrics/metricsData' -> [ :req | TeaResponse ok body: self metricsCSVData ];
		POST: '/micrometrics/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start