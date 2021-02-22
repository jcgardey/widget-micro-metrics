accessing
ratingValuesWithoutConsolidated
	^ self ratings reject: [ :rating | rating key = 'CONSOLIDATED' ] thenCollect: [ :rating | rating value asNumber ]