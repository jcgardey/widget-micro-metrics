accessing
metricsToCSV: widgetType
	| allMetricsOfWidgetType|
	allMetricsOfWidgetType := (Screencast selectAll
		flatCollect: [ :screencast | screencast metricsRankedByWidgetType: widgetType ]).
	^ String
		streamContents: [ :stream | 
			(NeoCSVWriter on: stream)
				fieldWriter: #raw;
				lineEndConvention: #cr;
				nextPut: (allMetricsOfWidgetType first keys), (OrderedCollection with: 'rating'); 
				nextPutAll: (allMetricsOfWidgetType collect: [ :metric | metric asArray ]) ]