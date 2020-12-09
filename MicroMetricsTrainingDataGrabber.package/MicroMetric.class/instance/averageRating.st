accessing
averageRating
	self notRanked
		ifTrue: [ ^ 0 ].
	^ (self ratingValues sum / self ratings size) asFloat