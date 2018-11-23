testing
inConflict
	^ (self ratings collect: [ :rating | rating value ]) asSet size > 1