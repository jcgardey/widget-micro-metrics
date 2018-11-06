initialization
initialize
	super initialize.
	metrics := OrderedCollection new.
	server := Teapot on
		GET: '/micrometrics/ping' -> 'pong';
		GET: '/micrometrics/metricsData' -> [ :req | TeaResponse ok body: self metricsCSVData ];
		POST: '/micrometrics/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start