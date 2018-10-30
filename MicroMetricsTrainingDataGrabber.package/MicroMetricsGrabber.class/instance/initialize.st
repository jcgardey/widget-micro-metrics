initialization
initialize
	super initialize.
	metrics := OrderedCollection new.
	server := Teapot on
		GET: '/ping' -> 'pong';
		GET: '/metricsData' -> [ :req | TeaResponse ok body: self metricsCSVData ];
		POST: '/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start