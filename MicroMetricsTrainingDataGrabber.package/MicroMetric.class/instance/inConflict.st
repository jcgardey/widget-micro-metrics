testing
inConflict
	^ self ratingValues asSet size > 1 and: [ (self raters includes: 'CONSOLIDATED') not ]