rendering
renderMicroMetric: microMetric headingOn: html
	html
		strong: microMetric id;
		space.
	html tbsLabel
		beSuccessIf: microMetric widgetType = 'TextInput';
		beInfoIf: microMetric widgetType = 'SelectInput';
		with: (microMetric widgetType allButLast: 5).
	self
		renderInspectMetric: microMetric linkOn: html;
		renderRemoveMetric: microMetric linkOn: html