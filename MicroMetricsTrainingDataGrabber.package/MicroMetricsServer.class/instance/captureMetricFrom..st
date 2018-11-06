initialization
captureMetricFrom: req
	(self grabbers at: (req at: #widgetType)) captureMetricFrom: req