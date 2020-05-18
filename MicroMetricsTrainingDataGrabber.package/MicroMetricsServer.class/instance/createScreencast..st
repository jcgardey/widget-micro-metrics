accessing
createScreencast: request
	| jsonBody |
	jsonBody := NeoJSONReader fromString: request contents.
	(Screencast id: (jsonBody at: 'screencastId') name: (jsonBody at: 'screencastName')) save.
	