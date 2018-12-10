testing
consolidated
	^ self ratings size > 1 & (self ratingValues asSet size = 1) or: [ self raters includes: 'CONSOLIDATED' ]