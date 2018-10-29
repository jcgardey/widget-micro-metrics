initialization
captureMetricFrom: req
	| metric |
	metric := Dictionary new.
	('*Infinity*' match: (req at: #typingSpeed))
		ifFalse: [ self metricsToCapture
				do: [ :metricName | metric at: metricName put: (req at: metricName) ].
			self addMetric: metric ]