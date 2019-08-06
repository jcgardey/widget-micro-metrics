updating
updateScreencast: request
	| jsonBody screencastFound |
	jsonBody := NeoJSONReader fromString: request contents.
	screencastFound := Screencast
		selectOne: [ :screencast | screencast id = (jsonBody at: 'screencastId') ].
	screencastFound
		ifNil: [ screencastFound := Screencast
				id: (jsonBody at: 'screencastId')
				name: (jsonBody at: 'screencastName')
				events: (jsonBody at: 'events') ]
		ifNotNil: [ screencastFound addEvents: (jsonBody at: 'events') ].
	screencastFound save.