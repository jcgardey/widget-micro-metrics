rendering
renderBodyOn: html
	html
		tbsForm: [ self
				renderRaterInputOn: html;
				renderMicroMetricsListOn: html;
				renderButtonsOn: html ]