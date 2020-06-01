accessing
metricFrom: request
	| id timestamp values |
	id := request at: #id.
	timestamp := DateAndTime fromUnixTime: (request at: #timestamp) asNumber / 1000.
	values := Dictionary new.
	self metricsToCapture
		do: [ :metricName | values at: metricName put: (request at: metricName) ].
	^ MicroMetric id: id timestamp: timestamp valuesDictionary: values xpath: (request at: #xpath)