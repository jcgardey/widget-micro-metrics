accessing
websiteName
	| url |
	url := metrics any url.
	url ifNotNil: [ websiteName := ('/' split: url) last ].
	^ websiteName