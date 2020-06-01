initialization
initialize
	events := SortedCollection sortBlock:[:event :anotherEvent | (event at: #timestamp) < (anotherEvent at: #timestamp)].
	metrics := Set new.
	timestamp := DateAndTime now