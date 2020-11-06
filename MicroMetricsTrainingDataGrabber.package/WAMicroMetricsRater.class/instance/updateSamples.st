controlling
updateSamples
	| found |
	found := Screencast
		selectMany:
			{('$or'
				->
					{{('websiteName'
						->
							{('$regex' -> searchTerm).
							('$options' -> 'i')} asDictionary)} asDictionary.
					{('screencastName'
						->
							{('$regex' -> searchTerm).
							('$options' -> 'i')} asDictionary)} asDictionary})}
				asDictionary.
	samples := searchTerm
		ifEmpty: [ Screencast selectAll ]
		ifNotEmpty: [ found ]