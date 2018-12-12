rendering
renderInspectMetric: aMicroMetric linkOn: html
	html space.
	html anchor
		target: '_blank';
		callback: [ self call: (WAMicroMetricView on: aMicroMetric) ];
		with: [ html tbsGlyphIcon iconEyeOpen ]