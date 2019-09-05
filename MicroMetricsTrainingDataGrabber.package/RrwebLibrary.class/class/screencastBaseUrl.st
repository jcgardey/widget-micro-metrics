uploaded
screencastBaseUrl
	^ screencastBaseUrl ifNil: [ screencastBaseUrl := self localScreencastBaseUrl ]