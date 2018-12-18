scripts
selectCSV
	<script>
	| trainingData metricsToCapture csvData |
	trainingData := self instance cleanSelectMetrics.
	metricsToCapture := #(clicks focusTime keystrokes optionsDisplayTime optionsSelected).
	csvData := String
		streamContents: [ :stream | 
			| writer |
			writer := NeoCSVWriter on: stream.
			writer nextPut: #(clicks focusTime keystrokes optionsDisplayTime optionsSelected RATING).
			trainingData
				do: [ :metric | 
					| valuesArray |
					valuesArray := (metricsToCapture collect: [ :metricName | metric valuesDictionary at: metricName ]) asOrderedCollection.
					valuesArray add: metric consolidatedRating asNumber.
					writer nextPut: valuesArray ] ].csvData inspect.
	'selectData.csv' asFileReference writeStream nextPutAll: csvData