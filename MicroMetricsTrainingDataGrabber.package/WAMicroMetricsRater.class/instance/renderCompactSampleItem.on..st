rendering
renderCompactSampleItem: sample on: html
	html tbsLinkifyListGroupItem
		callback: [ self renderSample: sample ];
		with: [ html span: sample timestamp asSimpleDate.
			html space.
			html strong: sample id.
			html space.
			self renderSampleRaters: sample on: html.
			html span
				class: #siteName;
				with: sample websiteName.
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