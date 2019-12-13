initialization
captureMetricFrom: request
	| grabber requestBody screencast capturedMetrics|
	requestBody := NeoJSONReader fromString: request contents.
	screencast := self findScreencast: (requestBody at: 'screencastId').
	capturedMetrics := (requestBody at: 'metrics').
	capturedMetrics
		do: [ :metricDict | 
			| metric |
			grabber := self grabbers at: (metricDict at: #widgetType).
			metric := grabber metricFrom: metricDict.
			(grabber isValid: metric)
				ifTrue: [ screencast addMetric: metric ] ].
	screencast save