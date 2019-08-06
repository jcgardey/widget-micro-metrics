initialization
initializeWithPort: aPort
	server := Teapot configure: {#port -> aPort . #debugMode -> true}.
	server
		GET: '/micrometrics/ping' -> 'pong';
		GET:
			'/micrometrics/metricsData'
				-> [ :request | TeaResponse ok body: self metricsCSVData ];
		POST:
			'/micrometrics/metrics/'
				-> [ :request | 
					self captureMetricFrom: request.
					TeaResponse ok
						headerName: 'Access-Control-Allow-Origin' value: '*';
						yourself  ].
	server start