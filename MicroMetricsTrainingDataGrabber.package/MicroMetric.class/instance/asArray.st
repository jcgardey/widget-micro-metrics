converting
asArray
	" converts metric to an array removing authorId, volunteer and widgetType. Add rating to the last position"
	| ar metricKeys |
	ar:= OrderedCollection new.
	metricKeys := self valuesDictionary keys asOrderedCollection.
	metricKeys removeAll: #(widgetType authorId volunteer).
	
	metricKeys do: [ :key | ar add: (self valuesDictionary at: key) asNumber].
	
	self ratings isNotEmpty ifTrue: [ ar add: (self ratings first value asInteger) ].
	^ar