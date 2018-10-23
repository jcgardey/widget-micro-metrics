api
train: train nbEpoch: nbEpoch
	"Train the network using the train data set."

	| sumError outputs expectedOutput t |
	1 to: nbEpoch do: [ :epoch | 
		sumError := 0.
		train
			do: [ :row | 
				outputs := self feed: row allButLast.
				expectedOutput := (1 to: self numberOfOutputs) collect: [ :notUsed | 0 ].
				expectedOutput at: row last + 1 put: 1.
				t := (1 to: expectedOutput size)
					collect: [ :i | (expectedOutput at: i) - (outputs at: i) raisedTo: 2 ].
				sumError := sumError + t sum.
				self backwardPropagateError: expectedOutput.
				self updateWeight: row allButLast ].
		errors add: sumError ]