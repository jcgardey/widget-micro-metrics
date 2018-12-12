rendering
renderContentOn: html
	html
		tbsContainer: [ html heading level2 with: 'Metric ' , microMetric id.
			microMetric valuesDictionary
				keysAndValuesDo: [ :key :value | 
					html
						definitionList: [ html
								definitionTerm: key;
								definitionData: value ] ] ]