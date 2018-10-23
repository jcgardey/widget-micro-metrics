initialization
configure: nbOfInputs hidden: nbOfNeurons1 hidden: nbOfNeurons2 nbOfOutputs: nbOfOutput
	"Configure the network with the given parameters
    The network has only one hidden layer"

	| random |
	random := Random seed: 42.
	self addLayer: (NeuronLayer with: nbOfNeurons1 neuronsAnd: nbOfInputs weightsUsing: random).
	self addLayer: (NeuronLayer with: nbOfNeurons2 neuronsAnd: nbOfNeurons1 weightsUsing: random).
	self addLayer: (NeuronLayer with: nbOfOutput neuronsAnd: nbOfNeurons2 weightsUsing: random)