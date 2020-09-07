accessing
consolidatedRating
	"self consolidated
		ifFalse: [ self error: 'Cannot answer a consolidated value if the Metric is not consolidated' ]."
	^ self ratings
		detect: [ :rating | rating key = 'CONSOLIDATED' ]
		ifFound: [ :consolidatedRating | consolidatedRating value ]
		ifNone: [ self ratingValues anyOne ]