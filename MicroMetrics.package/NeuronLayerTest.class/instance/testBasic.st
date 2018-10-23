running
testBasic
	| nl result r |
	r := Random seed: 42.
	nl := NeuronLayer with: 3 neuronsAnd: 4 weightsUsing: r.
	self assert: nl isOutputLayer.
	result := nl feed: {1 . 2 . 3 . 4}.
	self assert: result size equals: 3.
	self assert: result closeTo: #(0.037000501309787576 0.9051275824569505 0.9815269659126287)