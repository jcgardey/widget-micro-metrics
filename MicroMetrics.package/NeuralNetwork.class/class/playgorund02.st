playgrounds
playgorund02
	| trainingData network |
	trainingData := MicroMetricsServer instance cleanTextInputMetrics collect: #asArray.
	network := NeuralNetwork new.
	network configure: 5 hidden: 7 nbOfOutputs: 4.
	network train: (trainingData last: 30) nbEpoch: 2000.
	network feed: trainingData atRandom allButLast