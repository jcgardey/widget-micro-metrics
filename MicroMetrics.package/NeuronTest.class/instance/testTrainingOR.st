running
testTrainingOR
	| p |
	p := Neuron new bePerceptron.
	p weights: {-1 . -1}.
	p bias: 2.
	400
		timesRepeat: [ p train: {0 . 0} desiredOutput: 0.
			p train: {0 . 1} desiredOutput: 1.
			p train: {1 . 0} desiredOutput: 1.
			p train: {1 . 1} desiredOutput: 1 ].
	self assert: (p feed: {0 . 0}) equals: 0.
	self assert: (p feed: {0 . 1}) equals: 1.
	self assert: (p feed: {1 . 0}) equals: 1.
	self assert: (p feed: {1 . 1}) equals: 1