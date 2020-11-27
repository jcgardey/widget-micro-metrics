accessing
metricsByWidgetType: widgetType
	^ self metrics select: [ :metric | metric widgetType = widgetType and: [ metric discarded not] ]