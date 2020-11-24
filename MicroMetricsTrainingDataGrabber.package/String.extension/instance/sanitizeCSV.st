*MicroMetricsTrainingDataGrabber
sanitizeCSV
	^ ((self copyReplaceAll: ',' with: '')
		copyReplaceAll: Character lf asString
		with: '') copyReplaceAll: ' ' with: ''