accessing
metricsToCSV: widgetType filter: filterBlock rating: ratingBlock
	| allMetricsOfWidgetType metricKeys |
	allMetricsOfWidgetType := (Screencast selectAll flatCollect: [ :screencast | screencast metricsByWidgetType: widgetType ]) select: filterBlock.
	
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
						collect: [ :metric | metric asArrayUsing: metricKeys rating: ratingBlock]) ]