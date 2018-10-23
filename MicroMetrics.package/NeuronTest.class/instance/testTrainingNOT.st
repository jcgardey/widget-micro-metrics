running
testTrainingNOT
	| p |
	p := Neuron new bePerceptron.
	p weights: {-1}.
	p bias: 2.
	2000
		timesRepeat: [ p train: {0} desiredOutput: 1.
			p train: {1} desiredOutput: 0 ].
	self assert: (p feed: {0}) equals: 1.
	self assert: (p feed: {1}) equals: 0