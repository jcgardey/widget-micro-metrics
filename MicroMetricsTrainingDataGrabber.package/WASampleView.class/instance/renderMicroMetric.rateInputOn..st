rendering
renderMicroMetric: microMetric rateInputOn: html
	1 to: 4 do:
		[ :aNumber | self renderRatingRadioValue: aNumber for: microMetric on: html ].
	html textInput
		id: microMetric id;
		class: #ratingTextInput;
		callback: [ :value | self addRating: value to: microMetric ]