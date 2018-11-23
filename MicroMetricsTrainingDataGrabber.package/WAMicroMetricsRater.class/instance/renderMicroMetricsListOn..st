rendering
renderMicroMetricsListOn: html
	| grouped |
	grouped := self microMetrics groupedBy: [ :metric | metric sampleId ].
	html heading level4 with: 'MicroMetrics'.
	grouped
		keysAndValuesDo: [ :sampleId :sampleMetrics | self renderSample: sampleId metrics: sampleMetrics on: html ]