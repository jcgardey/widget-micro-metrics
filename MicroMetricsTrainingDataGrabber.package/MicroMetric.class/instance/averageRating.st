accessing
averageRating
	self notRanked
		ifTrue: [ ^ 0 ].
	^ (self ratingValuesWithoutConsolidated sum / self ratingValuesWithoutConsolidated size)
		asFloat