api
backwardPropagateError: expectedValues
	neurons
		with: expectedValues
		do: [ :neuron :expected | neuron adjustDeltaForExpected: expected ].
	self previousLayer ifNotNil: [ :previous | previous backwardPropagateError ]