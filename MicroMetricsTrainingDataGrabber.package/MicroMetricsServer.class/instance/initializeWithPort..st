initialization
initializeWithPort: aPort
	server := Teapot
		configure:
			{(#port -> aPort).
			(#debugMode -> true)}.
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
						yourself ];
		POST:
			'/micrometrics/start_screencast'
				-> [ :request | 
					self createScreencast: request.
					TeaResponse ok
						headerName: 'Access-Control-Allow-Origin'
						value: '*' ];
		POST:
			'/micrometrics/screencast'
				-> [ :request | self updateScreencast: request ];
		GET:
			'micrometrics/screencast/<:id>'
				-> [ :request | 
					TeaResponse ok
						headerName: 'Access-Control-Allow-Origin' value: '*';
						body: (self findScreencast: (request at: #id)) events ];
		output: #json.
	server start