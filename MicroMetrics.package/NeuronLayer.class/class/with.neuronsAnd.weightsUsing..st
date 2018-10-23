instance creation
with: neuronsCount neuronsAnd: weightsCount weightsUsing: random
	"Main method to create a neuron layer
    neuronsCount : number of neurons the layer should be made of
    weightsCount : number of weights each neuron should have
    random : a random number generator
    "

	^ self new
		initializeWith: neuronsCount neuronsAnd: weightsCount weightsUsing: random;
		yourself