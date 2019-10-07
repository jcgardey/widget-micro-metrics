*MicroMetricsTrainingDataGrabber
asSimpleDateAndTime
	^ String
		streamContents: [ :stream | 
			stream
				nextPutAll: self year printString;
				nextPut: $-;
				nextPutAll: self month printString;
				nextPut: $-;
				nextPutAll: self dayOfMonth printString.
			stream << String space.
			stream
				nextPutAll: self asTime hour printString;
				nextPut: $:;
				nextPutAll: self asTime minutes printString ]