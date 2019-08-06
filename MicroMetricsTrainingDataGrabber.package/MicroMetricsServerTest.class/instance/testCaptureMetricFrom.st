tests-initialization
testCaptureMetricFrom
	ZnClient new
		url:
			'http://localhost:' , self portForTesting printString
				, '/micrometrics/metrics/';
		formAt: 'widgetType' put: 'TextInput';
		formAt: 'id' put: 'awdas01351021';
		formAt: 'authorId' put: '1';
		formAt: 'volunteer' put: '1';
		formAt: 'timestamp' put: '1';
		formAt: 'typingLatency' put: '1';
		formAt: 'totalTypingTime' put: '2';
		formAt: 'typingSpeed' put: '3';
		formAt: 'typingVariance' put: '4';
		formAt: 'interactions' put: '[]';
		formAt: 'mouseTraceLength' put: '1200';
		formAt: 'correctionAmount' put: '6';
		post.
	self assert: server metrics size equals: 1.
	self assert: server metrics first id equals: 'awdas01351021'