controlling
updateSamples
	| all found |
	all := allSamples.
	found := all
		select: [ :screencast | 
			| searchableString |
			searchableString := String
				streamContents: [ :stream | 
					stream << screencast websiteName asString.
					stream << screencast screencastName.
					stream
						<<
							(screencast widgetTypes inject: '' into: [ :full :next | full , next ]) ].
			searchableString includesSubstring: searchTerm caseSensitive: false ].
	samples := searchTerm ifEmpty: [ all ] ifNotEmpty: [ found ]