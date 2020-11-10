*MicroMetricsTrainingDataGrabber
asSimpleDate
	^ String
		streamContents: [ :stream | 
			stream
				nextPutAll: self dayOfMonth printString;
				nextPut: $/;
				nextPutAll: self month printString ]