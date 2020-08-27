accessing
metricsToCSV: widgetType ranked: aBoolean
	| allMetricsOfWidgetType |
	allMetricsOfWidgetType := aBoolean
		ifTrue: [ Screencast selectAll
				flatCollect: [ :screencast | screencast metricsRankedByWidgetType: widgetType ] ]
		ifFalse: [ Screencast selectAll
				flatCollect: [ :screencast | screencast metricsByWidgetType: widgetType ] ].
	^ String
		streamContents: [ :stream | 
			(NeoCSVWriter on: stream)
				fieldWriter: #raw;
				lineEndConvention: #cr;
				nextPut:
					allMetricsOfWidgetType first keys , (OrderedCollection with: 'rating');
				nextPutAll: (allMetricsOfWidgetType collect: [ :metric | metric asArray ]) ]