tests-initialization
testCaptureMetricFrom
	| server |
	server := MicroMetricsGrabber onPort: 1709.
	ZnClient new
		url: 'http://localhost:1709/metrics/';
		formAt: 'typingLatency' put: '1';
		formAt: 'totalTypingTime' put: '2';
		formAt: 'typingSpeed' put: '3';
		formAt: 'typingVariance' put: '4';
		formAt: 'typingIntervals' put: '5';
		formAt: 'correctionAmount' put: '6';
		post.
	self assert: server metrics size equals: 1.
	server stop