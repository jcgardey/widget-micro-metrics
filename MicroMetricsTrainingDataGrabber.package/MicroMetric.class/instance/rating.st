accessing
rating
	^ self ratings isNotEmpty
		ifTrue: [ self consolidatedRating asNumber ]
		ifFalse: [ 0 ]