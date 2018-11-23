controlling
addRating: aNumber to: aMicroMetric
	raterId ~= '' & (aNumber ~= '')
		ifTrue: [ aMicroMetric addRating: raterId -> aNumber ]