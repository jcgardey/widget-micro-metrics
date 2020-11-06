accessing
websiteName
	"Hardcoded for current samples"

	| href name |
	href := self events first href.
	name := #(telepase mayoclinic constancia ebay lacaja estacionamiento)
		detect: [ :query | href includesSubstring: query ]
		ifNone: [ #desconocido ].
	^ websiteName ifNil: [ websiteName := name ]