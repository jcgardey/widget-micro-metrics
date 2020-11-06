rendering
renderSampleItem: sample on: html
	compactView
		ifTrue: [ self renderCompactSampleItem: sample on: html ]
		ifFalse: [ self renderDetailedSampleItem: sample on: html ]