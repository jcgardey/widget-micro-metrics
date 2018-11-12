rendering
renderBodyOn: html
	html tbsForm
		onSubmit: 'if ($("#raterIdGroup").val() == "") {$("#raterIdGroup").addClass("has-error"); window.scrollTo(0,0)}; return $("#raterId").val() != ""';
		with: [ self
				renderRaterInputOn: html;
				renderMicroMetricsListOn: html;
				renderButtonsOn: html ]