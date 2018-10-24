initialization
ifMetric: metric isValidDo: aBlock
	(metric at: #typingSpeed) = '-Infinity'
		ifFalse: aBlock value