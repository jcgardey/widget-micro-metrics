initialization
initializeWithPort: aPort
	server := Teapot configure: {(#port -> aPort)}.
	server
		GET: '/micrometrics/ping' -> 'pong';
		GET: '/micrometrics/metricsData' -> [ :request | TeaResponse ok body: self metricsCSVData ];
		POST: '/micrometrics/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start