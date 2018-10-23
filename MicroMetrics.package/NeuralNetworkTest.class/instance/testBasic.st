running
testBasic
	| n |
	n := NeuralNetwork new.
	n configure: 2 hidden: 2 nbOfOutputs: 1.
	self assert: (n feed: {1 . 3}) closeTo: #(0.6745388083637035)