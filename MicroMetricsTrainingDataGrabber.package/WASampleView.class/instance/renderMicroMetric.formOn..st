rendering
renderMicroMetric: microMetric formOn: html
	html
		tbsPanelHeading: [ self renderMicroMetric: microMetric headingOn: html ];
		tbsPanelBody: [ self renderMicroMetric: microMetric rateInputOn: html.
			microMetric ratings
				do: [ :rating | 
					html
						tbsBadge: [ html text: rating key.
							self mergeMode
								ifTrue: [ html space.
									html tbsGlyphIcon iconArrowRight.
									html space.
									html text: rating value ] ] ]
				separatedBy: [ html space ] ]