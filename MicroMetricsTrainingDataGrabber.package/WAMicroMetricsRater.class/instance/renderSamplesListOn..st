rendering
renderSamplesListOn: html
	| sorted firstHalf secondHalf |
	sorted := self samples sorted: [ :first :second | first id < second id ].
	firstHalf := sorted first: (sorted size / 2) ceiling.
	secondHalf := sorted last: (sorted size / 2) floor.
	html
		tbsRow: [ html
				tbsColumn: [ html tbsListGroup: [ firstHalf do: [ :sample | self renderSampleItem: sample on: html ] ] ]
					mediumSize: 6;
				tbsColumn: [ secondHalf do: [ :sample | self renderSampleItem: sample on: html ] ] mediumSize: 6 ]