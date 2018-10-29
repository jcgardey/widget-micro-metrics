initialization
initializeWithPort: aPort
	server stop.
	server := Teapot configure: {(#port -> aPort)}.
	server
		GET: '/ping' -> 'pong';
		GET: '/metricsData' -> [ :req | TeaResponse ok body: self metricsCSVData ];
		POST: '/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start