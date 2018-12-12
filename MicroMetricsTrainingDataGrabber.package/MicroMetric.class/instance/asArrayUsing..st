converting
asArrayUsing: someMetricKeys
	" converts metric to an array removing authorId, volunteer and widgetType. Add rating to the last position"

	| values |
	values := OrderedCollection new.
	someMetricKeys do: [ :key | values add: (self valuesDictionary at: key) asNumber ].
	self ratings isNotEmpty
		ifTrue: [ values add: self consolidatedRating asNumber ].
	^ values