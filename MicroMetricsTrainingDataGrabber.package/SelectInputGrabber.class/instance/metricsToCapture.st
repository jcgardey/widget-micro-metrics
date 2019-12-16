initialization
metricsToCapture
	^ super metricsToCapture
		, #(clicks keystrokes optionsSelected focusTime optionsDisplayTime)