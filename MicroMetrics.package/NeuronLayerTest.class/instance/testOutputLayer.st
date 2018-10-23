running
testOutputLayer
	| nl1 nl2 result random |
	random := Random seed: 42.
	nl1 := NeuronLayer with: 3 neuronsAnd: 4 weightsUsing: random.
	nl2 := NeuronLayer with: 4 neuronsAnd: 3 weightsUsing: random.
	nl1 nextLayer: nl2.
	self deny: nl1 isOutputLayer.
	self assert: nl2 isOutputLayer.
	result := nl1 feed: {1 . 2 . 3 . 4}.
	"Since nl2 has 4 neurons, we will obtain 4 outputs"
	self assert: result size equals: 4.
	self
		assert: result
		closeTo: #(0.030894022895187584 0.9220488835263312 0.5200462953493653 0.20276557516858304)