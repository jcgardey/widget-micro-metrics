rendering
renderBodyOn: html
	html tbsForm
		onSubmit: 'if ($("#raterIdGroup").val() == "") $("#raterIdGroup").addClass("has-error"); return $("#raterId").val() != ""';
		with: [ self
				renderRaterInputOn: html;
				renderMicroMetricsListOn: html;
				renderButtonsOn: html ]