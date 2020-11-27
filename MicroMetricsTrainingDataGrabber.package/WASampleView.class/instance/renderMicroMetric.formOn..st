rendering
renderMicroMetric: microMetric formOn: html
	html
		tbsPanelBody:
			[ "tbsPanelHeading: [ self renderMicroMetric: microMetric headingOn: html ];"
			self renderMicroMetric: microMetric rateInputOn: html.
			microMetric ratings
				do: [ :rating | 
					html
						tbsBadge: [ html text: rating key.
							self mergeMode
								ifTrue: [ html space.
									html tbsGlyphIcon iconArrowRight.
									html space.
									html text: rating value ] ] ]
				separatedBy: [ html space ].
			html
				div: [ html checkbox
						value: microMetric discarded;
						callback: [ :value | 
							microMetric
								discarded: value;
								save ].
					html label: 'Descartar' ] ]