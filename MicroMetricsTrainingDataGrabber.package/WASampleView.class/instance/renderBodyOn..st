rendering
renderBodyOn: html
	html hiddenInput
		id: #screencast_id;
		value: self sample id.
	html tbsColumn
		id: #replayer;
		mediumSize: 9.
	html
		tbsColumn 
		id: #metricsRaterColumn;
		mediumSize: 3;
		with: [ html paragraph: [ self renderMergeModeButtonOn: html ].
			html tbsForm
				onSubmit:
					'if ($("#raterIdGroup").val() == "") {$("#raterIdGroup").addClass("has-error"); window.scrollTo(0,0)}; return $("#raterId").val() != ""';
				with: [ self
						renderRaterInputOn: html;
						renderSample: self sample listOn: html ] ]