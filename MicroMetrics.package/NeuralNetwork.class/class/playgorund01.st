playgrounds
playgorund01
	| trainingData a b c d network |
	trainingData := OrderedCollection new.
	trainingData
		addAll:
			{#(2000 1500 220 120 0).
			#(4200 20000 1000 1300 1)}.
	100
		timesRepeat: [ a := Random new next * 500 + 4000.
			b := Random new next * 1000 + 1000.
			c := Random new next * 50 + 200.
			d := Random new next * 100 + 50.
			trainingData
				add:
					{a.
					b.
					c.
					d.
					0}
			"network train: { a . b . c . d } desiredOutputs: #(0)." ].
	100
		timesRepeat: [ a := Random new next * 500 + 4000.
			b := Random new next * 500 + 19000.
			c := Random new next * 10 + 1100.
			d := Random new next * 100 + 1500.
			trainingData
				add:
					{a.
					b.
					c.
					d.
					1}
			"network train: { a . b . c . d } desiredOutputs: #(1)." ].
	network := NeuralNetwork new.
	network
		configure: 4
		hidden: 7
		hidden: 5
		nbOfOutputs: 2.
	network train: trainingData nbEpoch: 50000.
	network predict: #(2000 1500 220 120).
	network predict: #(4000 1500 100 120).
	{#(1112.00 2862.00 238.50 104.76).
	#(2206.00 3434.00 343.40 230.18).
	#(4331.00 2199.00 314.14 86.37).
	#(2059.00 5609.00 509.91 139.61).
	#(1505.00 4541.00 648.71 210.85).
	#(1559.00 7864.00 604.92 320.00).
	#(1152.00 3746.00 374.60 220.81).
	#(6399.00 2476.00 353.71 86.02).
	#(0 0 0 0).
	#(4491.00 20510.00 1465.00 768.00).
	#(2874.00 25087.00 836.23 1627.99).
	#(3422.00 18682.00 1437.08 418.07).
	#(2583.00 33315.00 1148.79 1599.18).
	#(10319.00 18772.00 1444.00 1640.74).
	#(2246.00 28917.00 1606.00 1525.00)}
		collect: [ :values | 
			{values.
			(network predict: values)} ].
	(1 to: 20)
		collect: [ :notused | 
			a := Random new next * 1800 + 1000.
			b := Random new next * 2000 + 1000.
			c := Random new next * 200 + 100.
			d := Random new next * 1000 + 150.
			network
				predict:
					{a.
					b.
					c.
					d} ]