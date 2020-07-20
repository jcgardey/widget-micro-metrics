initialization
initialize
	events := SortedCollection sortBlock:[:event :anotherEvent | (event timestamp) < (anotherEvent timestamp)].
	metrics := Set new.
	timestamp := DateAndTime now