accessing
widgetTypes
	^ (self metrics collect: #widgetType as: Set) asOrderedCollection