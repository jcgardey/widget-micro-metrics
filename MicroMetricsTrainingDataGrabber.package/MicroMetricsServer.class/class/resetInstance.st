singleton
resetInstance
	Instance ifNotNil: [ :server | server stop ].
	Instance := nil