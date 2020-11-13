initialization
metricsToCapture 
	^ super metricsToCapture , #(hoverToFirstSelection clicks selections optionsCount) 