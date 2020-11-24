accessing
metricsToCSV: widgetType ranked: aBoolean
	| allMetricsOfWidgetType metricKeys |
	allMetricsOfWidgetType := aBoolean
		ifTrue: [ Screencast selectAll
				flatCollect: [ :screencast | screencast metricsRankedByWidgetType: widgetType ] ]
		ifFalse: [ Screencast selectAll
				flatCollect: [ :screencast | screencast metricsByWidgetType: widgetType ] ].
	metricKeys := (self collectKeysForMetrics: allMetricsOfWidgetType)
		asOrderedCollection.
	^ String
		streamContents: [ :stream | 
			(NeoCSVWriter on: stream)
				fieldWriter: #raw;
				lineEndConvention: #lf;
				nextPut: metricKeys , (OrderedCollection with: 'rating');
				nextPutAll:
					(allMetricsOfWidgetType
						collect: [ :metric | metric asArrayUsing: metricKeys ]) ]