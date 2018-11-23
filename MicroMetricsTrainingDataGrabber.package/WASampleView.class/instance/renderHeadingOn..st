rendering
renderHeadingOn: html
	super renderHeadingOn: html.
	html
		tbsBreadcrumb: [ html
				tbsBreadcrumbSection: [ html anchor
						callback: [ self answer ];
						with: 'All Metrics' ].
			html tbsBreadcrumbSection
				beActive;
				with: self sampleId ].
	html paragraph: [ self renderMergeModeButtonOn: html ]