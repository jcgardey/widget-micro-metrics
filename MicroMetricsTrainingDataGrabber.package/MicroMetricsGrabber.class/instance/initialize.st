initialization
initialize
	super initialize.
	metrics := OrderedCollection new.
	server := Teapot on
		GET: '/ping' -> 'pong';
		POST: '/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start