as yet unclassified
screencastsByWebsitename
	| names |
	names := Dictionary new.
	Screencast selectAll
		do:
			[ :s | (names at: s websiteName ifAbsentPut: OrderedCollection new) add: s stats ].
	^ names