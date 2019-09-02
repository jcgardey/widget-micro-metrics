tests-initialization
testCaptureMetricFrom
	| endpointUrl |
	endpointUrl := 'http://localhost:' , self portForTesting printString
		, '/micrometrics/metrics/'.
	ZnClient new
		url: endpointUrl;
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
	self assert: server metrics first id equals: 'awdas01351021'.
	ZnClient new
		url: endpointUrl;
		formAt: 'widgetType' put: 'SelectInput';
		formAt: 'id' put: 'awdas01351022';
		formAt: 'authorId' put: '1';
		formAt: 'volunteer' put: '1';
		formAt: 'timestamp' put: '1';
		formAt: 'clicks' put: '1';
		formAt: 'focusTime' put: '2';
		formAt: 'keystrokes' put: '3';
		formAt: 'optionsDisplayTime' put: '4000';
		formAt: 'interactions' put: '[]';
		formAt: 'mouseTraceLength' put: '1200';
		formAt: 'optionsSelected' put: '0';
		post.
	self assert: server metrics size equals: 2.
	self assert: server metrics first id equals: 'awdas01351021'.
	self assert: server metrics second id equals: 'awdas01351022'.
	ZnClient new
		url: endpointUrl;
		formAt: 'widgetType' put: 'SelectInput';
		formAt: 'id' put: 'awdas01351022';
		formAt: 'authorId' put: '1';
		formAt: 'volunteer' put: '1';
		formAt: 'timestamp' put: '1';
		formAt: 'clicks' put: '1';
		formAt: 'focusTime' put: '2';
		formAt: 'keystrokes' put: '3';
		formAt: 'optionsDisplayTime' put: '4000';
		formAt: 'interactions' put: '[]';
		formAt: 'mouseTraceLength' put: '1200';
		formAt: 'optionsSelected' put: '2';
		post.
	self assert: server metrics size equals: 2.
	self assert: server metrics first id equals: 'awdas01351021'.
	self assert: server metrics second id equals: 'awdas01351022'.
	self
		assert: (server metrics second valuesDictionary at: #optionsSelected)
		equals: '2'