rendering
renderBodyOn: html
	html div
		id: #samples;
		with: [ self renderSamplesListOn: html ]