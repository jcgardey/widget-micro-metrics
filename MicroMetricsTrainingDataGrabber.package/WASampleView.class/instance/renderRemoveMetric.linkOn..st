rendering
renderRemoveMetric: aMicroMetric linkOn: html
	html space.
	html anchor
		callback: [ self removeMetric: aMicroMetric ];
		with: [ html tbsGlyphIcon iconTrash ]