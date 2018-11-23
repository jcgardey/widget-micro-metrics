rendering
renderDownladButtonOn: html
	html anchor
		class: 'btn btn-default';
		callback: [ self downloadFile ];
		with: [ html tbsGlyphIcon iconCloudDownload.
			html space.
			html text: 'Download all Metrics' ]