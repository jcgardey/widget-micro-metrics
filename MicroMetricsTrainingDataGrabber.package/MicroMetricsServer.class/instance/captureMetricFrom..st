initialization
captureMetricFrom: request
	| grabber requestBody screencast |
	requestBody := NeoJSONReader fromString: request contents.
	screencast := self findScreencast: (requestBody at: 'screencastId').
	(requestBody at: 'metrics')
		do: [ :metricDict | 
			grabber := self grabbers at: (metricDict at: #widgetType).
			screencast addMetric: (grabber metricFrom: metricDict).
			].
	screencast save