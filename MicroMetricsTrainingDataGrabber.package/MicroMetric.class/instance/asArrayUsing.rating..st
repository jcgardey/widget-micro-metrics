converting
asArrayUsing: someMetricKeys rating: ratingBlock
	| values |
	values := someMetricKeys
		collect: [ :key | 
			key = #id
				ifTrue: [ self id ]
				ifFalse: [ (self valuesDictionary at: key ifAbsent: 'NaN') sanitizeCSV ] ].
	values addLast: (ratingBlock value: self).
	^ values