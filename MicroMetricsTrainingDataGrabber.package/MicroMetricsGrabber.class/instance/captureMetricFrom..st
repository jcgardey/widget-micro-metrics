accessing
captureMetricFrom: req
	| metric |
	metric := Dictionary new.
	self metricsToCapture
		do: [ :metricName | metric at: metricName put: (req at: metricName) ].
	self addMetric: metric