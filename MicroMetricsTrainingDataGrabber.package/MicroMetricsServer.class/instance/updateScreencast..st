updating
updateScreencast: request
	| jsonBody screencastFound |
	jsonBody := NeoJSONReader fromString: request contents.
	screencastFound := self findScreencast: (jsonBody at: 'id').
	screencastFound
		ifNil: [ screencastFound := Screencast id: (jsonBody at: 'id') ].
	screencastFound
		addEvents:
			((jsonBody at: 'events')
				collect: [ :eventDict | ScreencastEvent values: eventDict ]).
	self captureMetricFrom: (jsonBody at: 'metrics') for: screencastFound.
	screencastFound save