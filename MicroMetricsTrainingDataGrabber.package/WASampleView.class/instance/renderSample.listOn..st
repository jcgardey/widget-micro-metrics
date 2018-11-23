rendering
renderSample: aSampleId listOn: html
	| sampleMetrics |
	sampleMetrics := self metricsBySample at: aSampleId.
	self renderSample: sampleId metrics: sampleMetrics on: html