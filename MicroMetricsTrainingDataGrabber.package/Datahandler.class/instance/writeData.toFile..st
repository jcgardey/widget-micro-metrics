writing
writeData: aCollection toFile: aFilename
	| metricsArray stream |
	metricsArray := aCollection
		collect: [ :dict | 
			{ dict at: #id.
			dict at: #timestamp.
			dict at: #typingLatency.
			dict at: #totalTypingTime.
			dict at: #typingSpeed.
			dict at: #typingVariance.
			dict at: #correctionAmount} ].
	stream := aFilename asFileReference writeStream.
	(NeoCSVWriter on: stream)
		nextPut: {'ID'. 'Timestamp'. 'Typ Latency' . 'Total Typ Time' . 'Typ Speed' . 'Type Speed Var'. 'Correction Amount' . 'Score'};
		nextPutAll: metricsArray