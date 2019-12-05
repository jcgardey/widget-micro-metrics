initialization
captureMetricFrom: request
	| grabber requestBody screencast |
	requestBody := NeoJSONReader fromString: request contents.
	screencast := self findScreencast: (requestBody at: 'screencastId'). self halt.
	(requestBody at: 'metrics')
		do: [ :metricDict | 
			| metric |
			grabber := self grabbers at: (metricDict at: #widgetType).
			metric := grabber metricFrom: metricDict.
			(grabber isValid: metric)
				ifTrue: [ screencast addMetric: metric ] ].
	screencast save