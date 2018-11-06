accessing
metricsCSVData
	^ String
		streamContents: [ :stream | 
			| writer |
			writer := NeoCSVWriter on: stream.
			writer
				nextPutAll:
					#(#('typingLatency' 'totalTypingTime' 'typingSpeed' 'typingVariance' 'correctionAmount')).
			self metrics
				do: [ :metric | 
					writer
						nextPut:
							{(metric at: 'typingLatency').
							(metric at: 'totalTypingTime').
							(metric at: 'typingSpeed').
							(metric at: 'typingVariance').
							(metric at: 'correctionAmount')} ] ]