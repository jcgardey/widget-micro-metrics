initialization
metricsToCapture
	^ super metricsToCapture
		, #(clicks focusTime keystrokes optionsDisplayTime optionsSelected)