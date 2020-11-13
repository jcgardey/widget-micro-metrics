converting
asArrayUsing: someMetricKeys
	| values |
	values := someMetricKeys collect: [ :key | self valuesDictionary at: key ifAbsent: 'NaN' ].
	self ratings isNotEmpty
		ifTrue: [ values addLast: self consolidatedRating asNumber ].
	^ values