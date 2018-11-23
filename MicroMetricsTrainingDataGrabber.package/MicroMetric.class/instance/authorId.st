accessing
authorId
	^ self valuesDictionary at: #authorId ifAbsent: 'No author'