initialization
captureMetricFrom: request
	| grabber metric |
	grabber := self grabbers at: (request at: #widgetType).
	metric := grabber metricFrom: request.
	self storeMetric: metric