converting
asArrayUsing: someMetricKeys
	| values |
	values := someMetricKeys
		collect: [ :key | 
			key = #id
				ifTrue: [ self id ]
				ifFalse: [( self valuesDictionary at: key ifAbsent: 'NaN') sanitizeCSV] ].
	self ratings isNotEmpty
		ifTrue: [ values addLast: self consolidatedRating asNumber ]
		ifFalse: [ values add: 0 ].
	^ values