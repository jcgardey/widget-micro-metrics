updating
captureMetricFrom: capturedMetrics for: screencast
	| grabber|
	capturedMetrics
		do: [ :metricDict | 
			| metric |
			grabber := self grabbers at: (metricDict at: #widgetType).
			metric := grabber metricFrom: metricDict.
			(grabber isValid: metric)
				ifTrue: [ screencast addMetric: metric ] ].