initialization
initializeWith: neuronsCount neuronsAnd: weightsCount weightsUsing: random
	| weights |
	learningRate := 0.1.
	neurons := (1 to: neuronsCount)
		collect: [ :i | 
			weights := (1 to: weightsCount) collect: [ :ii | random next * 4 - 2 ].
			Neuron weights: weights bias: random next * 4 - 2 ]