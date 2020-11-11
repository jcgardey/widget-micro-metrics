rendering
renderDetailedSampleItem: sample on: html
	html tbsLinkifyListGroupItem
		callback: [ self renderSample: sample ];
		with: [ html span: sample timestamp asSimpleDateAndTime.
			html space.
			html strong: sample screencastName.
			html space.
			self renderSampleRaters: sample on: html.
			sample inConflict
				ifTrue: [ html space.
					html tbsLabel
						beWarning;
						with: sample conflictingMetricsCount greaseString , ' a consolidar' ].
			sample hasOneRatingMetrics
				ifTrue: [ html space.
					html tbsLabel
						beInfo;
						with: sample oneRatingMetricsCount greaseString , ' con 1 valor' ].
			html paragraph: [ self renderMetricsSummaryFor: sample on: html ] ]