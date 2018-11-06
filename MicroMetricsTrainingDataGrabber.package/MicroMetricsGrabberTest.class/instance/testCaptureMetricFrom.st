tests-initialization
testCaptureMetricFrom
	| server |
	server := MicroMetricsServer onPort: 1709.
	ZnClient new
		url: 'http://localhost:1709/metrics/';
		formAt: 'widgetType' put: 'TextInput';
		formAt: 'typingLatency' put: '1';
		formAt: 'totalTypingTime' put: '2';
		formAt: 'typingSpeed' put: '3';
		formAt: 'typingVariance' put: '4';
		formAt: 'typingIntervals' put: '5';
		formAt: 'correctionAmount' put: '6';
		post.
	self assert: (server grabbers at: #TextInput) metrics size equals: 1.
	server stop