updating
updateScreencast: request
	| jsonBody screencastFound |
	jsonBody := NeoJSONReader fromString: request contents.
	screencastFound := self findScreencast: (jsonBody at: 'id').
	screencastFound
		ifNil: [ screencastFound := Screencast
				id: (jsonBody at: 'id')
				taskCompleted: (jsonBody at: 'finished')
				duration: (Duration milliSeconds: (jsonBody at: 'time'))
				errors: (jsonBody at: 'errors')
				questions: (jsonBody at: 'questions') ].
	screencastFound
		addEvents:
			((jsonBody at: 'events')
				collect: [ :eventDict | ScreencastEvent values: eventDict ]).
	self captureMetricFrom: (jsonBody at: 'metrics') for: screencastFound.
	screencastFound save