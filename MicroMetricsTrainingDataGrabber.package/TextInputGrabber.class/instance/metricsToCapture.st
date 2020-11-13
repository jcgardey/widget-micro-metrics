initialization
metricsToCapture
	^ super metricsToCapture
		, #(typingLatency focusTime typingSpeed typingVariance correctionAmount inputSwitches enteredText)