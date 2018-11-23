rendering
renderSamplesListOn: html
	self metricsBySample
		keysDo: [ :sampleId | 
			html
				paragraph: [ html anchor
						callback: [ self renderSample: sampleId ];
						with: sampleId ] ]