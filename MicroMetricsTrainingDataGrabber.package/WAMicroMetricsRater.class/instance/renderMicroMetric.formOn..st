rendering
renderMicroMetric: microMetric formOn: html
	html
		tbsPanelHeading: [ html
				strong: microMetric id;
				space;
				text: microMetric timestamp asFileNameCompatibleString ];
		tbsPanelBody: [ html textInput callback: [ :value | self addRating: value to: microMetric ].
			microMetric raters do: [ :rater | html tbsBadge: rater ] separatedBy: [ html space ] ]