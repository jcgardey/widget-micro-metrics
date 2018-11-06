tests-initialization
testCaptureMetricFrom
	| client |
	client := ZnClient new
		url: 'http://localhost:' , self portForTesting printString , '/micrometrics/metrics/'.
	grabber metricsToCapture do: [ :metricName | client formAt: metricName put: '1' ].
	client post.
	self assert: grabber metrics size equals: 1