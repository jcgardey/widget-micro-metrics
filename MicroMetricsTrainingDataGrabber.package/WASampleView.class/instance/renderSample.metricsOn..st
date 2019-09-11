rendering
renderSample: aSample metricsOn: html
	html heading level4 with: 'Metrics List'.
	html
		tbsPanelGroup: [ aSample metricsByTimestamp
				do: [ :microMetric | 
					html tbsPanel beDefault
						class: 'panel-danger' if: self mergeMode & microMetric inConflict;
						with: [ self renderMicroMetric: microMetric formOn: html ] ] ].
	self renderButtonsOn: html