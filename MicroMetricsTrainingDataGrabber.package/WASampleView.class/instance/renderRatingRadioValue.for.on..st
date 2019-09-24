rendering
renderRatingRadioValue: aNumber for: aMicroMetric on: html
	| classesByValue |
	classesByValue := #('btn-success' 'btn-info' 'btn-warning' 'btn-danger').
	html label
		class: #ratingRadioLabel;
		class: #unselected;
		class: #btn;
		class: (classesByValue at: aNumber);
		with: [ html radioButton
				name: aMicroMetric id;
				class: #ratingRadio;
				value: aNumber;
				with: aNumber ]