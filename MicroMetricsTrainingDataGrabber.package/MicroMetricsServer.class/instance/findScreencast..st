accessing
findScreencast: aString
	^ Screencast selectOne: [ :screencast | screencast id = aString ].