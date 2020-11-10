api
removeDebugger
	#('rater')
		do: [ :applicationName | 
			(WAAdmin defaultDispatcher handlerAt: applicationName)
				exceptionHandler: WAHtmlErrorHandler ]