api
adjustDeltaForExpected: expected
	| theError |
	theError := expected - self output.
	self adjustDeltaWith: theError