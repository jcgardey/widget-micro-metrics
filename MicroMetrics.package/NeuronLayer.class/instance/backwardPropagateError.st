api
backwardPropagateError
	"This is a recursive method. The back propagation begins with the output layer (i.e., the last layer)"

	"We are in an hidden layer"

	neurons
		doWithIndex: [ :neuron :j | 
			| theError |
			theError := 0.0.
			self nextLayer neurons do: [ :nextNeuron | theError := theError + ((nextNeuron weights at: j) * nextNeuron delta) ].
			neuron adjustDeltaWith: theError ].
	self previousLayer notNil
		ifTrue: [ self previousLayer backwardPropagateError ]