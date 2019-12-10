printing
printOn: aStream
	super printOn: aStream.
	aStream << ' ('.
	aStream << self widgetType.
	aStream << ')'.