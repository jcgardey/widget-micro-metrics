accessing
metricsRankedByWidgetType: widgetType
	^ (self metricsByWidgetType: widgetType)
		reject: [ :metric | metric notRanked ]