initialization
initializeWithPort: aPort
	server stop.
	server := Teapot configure: {(#port -> aPort)}.
	server
		GET: '/micrometrics/ping' -> 'pong';
		GET: '/micrometrics/metricsData' -> [ :req | TeaResponse ok body: self metricsCSVData ];
		POST: '/micrometrics/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start