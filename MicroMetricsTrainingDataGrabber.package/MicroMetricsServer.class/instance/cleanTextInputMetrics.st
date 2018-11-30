accessing
cleanTextInputMetrics
	| cleanMetrics textInputMetrics |
	cleanMetrics := MicroMetricsServer instance metrics select: #consolidated.
	textInputMetrics := cleanMetrics
		select: [ :metric | 
			(metric valuesDictionary at: #widgetType) = 'TextInput'
				and: [ (metric valuesDictionary at: #typingSpeed) ~= '0' ] ].
	textInputMetrics := textInputMetrics
		reject: [ :metric | (metric valuesDictionary at: #typingVariance) = 'NaN' ].
	^ textInputMetrics