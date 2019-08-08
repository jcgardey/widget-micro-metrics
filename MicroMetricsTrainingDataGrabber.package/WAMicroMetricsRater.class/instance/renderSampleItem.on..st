rendering
renderSampleItem: sample on: html
	html tbsLinkifyListGroupItem
		callback: [ self renderSample: sample ];
		with: [ html text: sample screencastName.
			sample inConflict
				ifTrue: [ html space.
					html tbsLabel
						beWarning;
						with: sample conflictingMetricsCount greaseString , ' a consolidar' ].
			sample hasOneRatingMetrics
				ifTrue: [ html space.
					html tbsLabel
						beInfo;
						with: sample oneRatingMetricsCount greaseString , ' con 1 valor' ] ]