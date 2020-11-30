initialization
initializeWithPort: aPort
	server := Teapot
		configure:
			{(#port -> aPort).
			(#debugMode -> true)}.
	server
		GET: '/micrometrics/ping' -> 'pong';
		GET:
			'/micrometrics/csv/<:widgetType>'
				-> [ :request | 
					TeaResponse ok
						headerName: 'Content-type' value: 'text/csv';
						body:
							(self
								metricsToCSV: (request at: #widgetType)
								filter: [ :elem | true ]
								rating: [ :metric | metric rating ]) ];
		GET:
			'/micrometrics/csv/<:widgetType>/consolidated'
				-> [ :request | 
					TeaResponse ok
						headerName: 'Content-type' value: 'text/csv';
						body:
							(self
								metricsToCSV: (request at: #widgetType)
								filter: [ :metric | metric notRanked not ]
								rating: [ :metric | metric rating ]) ];
		GET:
			'/micrometrics/csv/<:widgetType>/averaged'
				-> [ :request | 
					TeaResponse ok
						headerName: 'Content-type' value: 'text/csv';
						body:
							(self
								metricsToCSV: (request at: #widgetType)
								filter: [ :metric | metric notRanked not ]
								rating: [ :metric | metric averageRating ]) ];
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