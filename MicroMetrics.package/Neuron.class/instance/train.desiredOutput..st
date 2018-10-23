api
train: inputs desiredOutput: desiredOutput
	| output alpha theError delta |
	output := self feed: inputs.
	alpha := 0.1.
	
	theError := desiredOutput - output.
	delta := theError * (activationFunction derivative: output).
	
	inputs
		withIndexDo:
			[ :anInput :index | weights at: index put: (weights at: index) + (alpha * delta * anInput) ].

	self bias: bias + (alpha * theError)