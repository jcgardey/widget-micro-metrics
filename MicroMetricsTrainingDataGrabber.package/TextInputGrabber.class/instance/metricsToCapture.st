initialization
metricsToCapture
	^ super metricsToCapture
		, #(typingLatency totalTypingTime typingSpeed typingVariance correctionAmount inputSwitches)