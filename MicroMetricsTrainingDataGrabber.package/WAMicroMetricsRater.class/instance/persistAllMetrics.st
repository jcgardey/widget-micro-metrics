controlling
persistAllMetrics
	FileStream
		forceNewFileNamed: self metricsFileName
		do: [ :aStream | FLSerializer newDefault serialize: self microMetrics on: aStream binary ]