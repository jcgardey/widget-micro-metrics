scripts
textInputCSV
	<script>
	| trainingData metricsToCapture csvData |
	trainingData := self instance cleanTextInputMetrics.
	metricsToCapture := #(typingLatency totalTypingTime typingSpeed typingVariance correctionAmount).
	csvData := String
		streamContents: [ :stream | 
			| writer |
			writer := NeoCSVWriter on: stream.
			writer nextPut: #(typingLatency totalTypingTime typingSpeed typingVariance correctionAmount RATING).
			trainingData
				do: [ :metric | 
					| valuesArray |
					valuesArray := (metricsToCapture collect: [ :metricName | metric valuesDictionary at: metricName ]) asOrderedCollection.
					valuesArray add: metric consolidatedRating asNumber.
					writer nextPut: valuesArray ] ].
	'textData.csv' asFileReference writeStream nextPutAll: csvData