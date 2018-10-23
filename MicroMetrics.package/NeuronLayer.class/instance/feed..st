api
feed: inputs
	| outputs |
	outputs := self neurons collect: [ :neuron | neuron feed: inputs ].
	^ self isOutputLayer
		ifTrue: [ outputs ]
		ifFalse: [ self nextLayer feed: outputs ]