as yet unclassified
loadDataFromFile: aFilename
	| readStream reader |
	readStream := aFilename asFileReference readStream.
	reader := NeoCSVReader on: readStream.
	reader skipHeader.
	^ reader
		addField "id" 
		addFloatField; "timestamp"
		addFloatField; "typ latency"
		addFloatField; "total typ time"
		addFloatField; "typ speed"
		addFloatField; "typ speed variance"
		addIntegerField; "correction amount"
		addIntegerField; "score" 
		upToEnd.
