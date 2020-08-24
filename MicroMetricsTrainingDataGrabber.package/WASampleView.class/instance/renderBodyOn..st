rendering
renderBodyOn: html
	html hiddenInput
		id: #screencast_id;
		value: self sample id.
	html tbsColumn
		mediumSize: 9;
		with: [ html div id: #replayer.
			html anchor
				class: 'btn btn-danger';
				style: 'margin-top: 10px';
				callback: [ self removeSample ];
				with: 'Eliminar Screencast'.
			html span with: ' (No se puede deshacer!)' ].
	html tbsColumn
		id: #metricsRaterColumn;
		mediumSize: 3;
		with: [ html paragraph: [ self renderMergeModeButtonOn: html ].
			html tbsForm
				onSubmit:
					'if ($("#raterIdGroup").val() == "") {$("#raterIdGroup").addClass("has-error"); window.scrollTo(0,0)}; return $("#raterId").val() != ""';
				with: [ self
						renderRaterInputOn: html;
						renderSample: self sample listOn: html ] ]