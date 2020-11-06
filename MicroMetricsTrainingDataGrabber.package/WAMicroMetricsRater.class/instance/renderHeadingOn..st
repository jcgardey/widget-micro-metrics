rendering
renderHeadingOn: html
	super renderHeadingOn: html.
	html div
		class: #controls;
		with: [ self
				renderDownladButtonOn: html;
				renderViewToggleOn: html;
				renderFilterOn: html ]