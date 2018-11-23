controlling
switchMergeMode
	mergeMode := mergeMode not.
	mergeMode
		ifTrue: [ self raterId: 'CONSOLIDATED' ]
		ifFalse: [ self raterId: '' ]