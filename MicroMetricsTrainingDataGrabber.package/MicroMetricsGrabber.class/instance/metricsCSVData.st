accessing
metricsCSVData
	^ String
		streamContents: [ :stream | 
			| writer |
			writer := NeoCSVWriter on: stream.
			writer nextPut: self metricsToCapture.
			self metrics
				do:
					[ :metric | writer nextPut: (self metricsToCapture collect: [ :metricName | metric at: metricName ]) ] ]