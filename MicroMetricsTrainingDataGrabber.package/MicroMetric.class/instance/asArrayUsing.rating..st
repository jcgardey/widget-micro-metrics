converting
asArrayUsing: someMetricKeys rating: ratingBlock
	| values |
	values := someMetricKeys
		collect: [ :key | 
			(#(id url) includes: key)
				ifTrue: [ self perform: key ]
				ifFalse: [ (self valuesDictionary at: key ifAbsent: 'NaN') sanitizeCSV ] ].
	values addLast: (ratingBlock value: self).
	^ values