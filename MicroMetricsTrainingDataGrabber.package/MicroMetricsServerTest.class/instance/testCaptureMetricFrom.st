tests-initialization
testCaptureMetricFrom
	ZnClient new
		url: 'http://localhost:' , self portForTesting printString , '/micrometrics/metrics/';
		formAt: 'widgetType' put: 'TextInput';
		formAt: 'id' put: '1';
		formAt: 'timestamp' put: '1';
		formAt: 'typingLatency' put: '1';
		formAt: 'totalTypingTime' put: '2';
		formAt: 'typingSpeed' put: '3';
		formAt: 'typingVariance' put: '4';
		formAt: 'correctionAmount' put: '6';
		post.
	self assert: (server grabbers at: #TextInput) metrics size equals: 1