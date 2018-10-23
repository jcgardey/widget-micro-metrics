initialization
configure: nbOfInputs hidden: nbOfNeurons nbOfOutputs: nbOfOutput
	"Configure the network with the given parameters
    The network has only one hidden layer"

	| random |
	random := Random seed: 42.
	self addLayer: (NeuronLayer with: nbOfNeurons neuronsAnd: nbOfInputs weightsUsing: random).
	self addLayer: (NeuronLayer with: nbOfOutput neuronsAnd: nbOfNeurons weightsUsing: random)