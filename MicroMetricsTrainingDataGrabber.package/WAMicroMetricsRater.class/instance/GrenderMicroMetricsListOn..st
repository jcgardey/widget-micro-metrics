rendering
GrenderMicroMetricsListOn: html
	html heading level4 with: 'MicroMetrics'.
	html
		tbsPanelGroup: [ self microMetrics
				do:
					[ :microMetric | html tbsPanel beDefault with: [ self renderMicroMetric: microMetric formOn: html ] ] ]