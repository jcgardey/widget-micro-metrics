converting
asArray
	" converts metric to an array removing authorId, volunteer and widgetType. Add rating to the last position"

	| values metricKeys |
	values := OrderedCollection new.
	metricKeys := self valuesDictionary keys asOrderedCollection.
	metricKeys
		removeAll: #(widgetType authorId volunteer);
		remove: #mouseTraceLength ifAbsent: [  ];
		remove: #interactions ifAbsent: [  ].
	metricKeys do: [ :key | values add: (self valuesDictionary at: key) asNumber ].
	self ratings isNotEmpty
		ifTrue: [ values add: self consolidatedRating asNumber ].
	^ values