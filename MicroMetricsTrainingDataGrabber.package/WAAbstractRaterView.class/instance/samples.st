accessing
samples
	| samples |
	samples := OrderedCollection new.
	self metricsBySample
		keysAndValuesDo: [ :sampleId :metrics | samples add: (Sample id: sampleId metrics: metrics) ].
	^ samples