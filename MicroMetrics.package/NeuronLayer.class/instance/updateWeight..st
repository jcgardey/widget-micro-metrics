api
updateWeight: initialInputs
	"Update the weights of the neuron based on the set of initial input. This method assumes that the receiver of the message invoking that method is the first hidden layer."

	| inputs |
	inputs := initialInputs.
	neurons
		do: [ :n | 
			n adjustWeightWithInput: inputs learningRate: learningRate.
			n adjustBiasUsingLearningRate: learningRate ].
	self nextLayer ifNotNil: [ self nextLayer updateWeight ]