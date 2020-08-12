accesing
remove 
	events do: [ :event | event class remove: event ].
	metrics do: [ :metric | metric class remove: metric ].
	self class remove: self.