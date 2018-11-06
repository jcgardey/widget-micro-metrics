initialization
initialize
	super initialize.
	grabbers := Dictionary new.
	grabbers at: #TextInput put: TextInputGrabber new.
	grabbers at: #SelectInput put: SelectInputGrabber new.
	
	server := Teapot on
		GET: '/ping' -> 'pong';
		POST: '/metrics/' -> [ :request | self captureMetricFrom: request ].
	server start