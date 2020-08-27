converting
asArray
	" converts metric to an array removing authorId, volunteer and widgetType. Add rating to the last position"
	| values |
	values :=  self keys collect: [ :key | (self valuesDictionary at: key) ].
	self ratings isNotEmpty
		ifTrue: [ values add: self consolidatedRating asNumber ] ifFalse: [values add:0].
	^ values