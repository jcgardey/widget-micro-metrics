rendering
renderMicroMetric: microMetric rateInputOn: html
	html hiddenInput class: #micrometricHiddenId; value: microMetric id.
	html hiddenInput class: #micrometricHiddenXpath; value: microMetric xpath asStringWithCr.
	html hiddenInput class: #micrometricHiddenHTML; value: (microMetric valueAt: #html).
	html paragraph: (microMetric valueAt: #label).
	html tbsLabel
		beSuccessIf: microMetric widgetType = 'TextInput';
		beInfoIf: microMetric widgetType = 'SelectInput';
		beWarningIf: microMetric widgetType = 'RadioSet';
		beDangerIf: microMetric widgetType = 'Anchor';
		bePrimaryIf: microMetric widgetType = 'Datepicker';
		bePrimaryIf: microMetric widgetType = 'DateSelect';
		title: microMetric widgetType;
		with: microMetric widgetType first.
	html space.
	1 to: 4 do:
		[ :aNumber | self renderRatingRadioValue: aNumber for: microMetric on: html ].
	html textInput
		id: microMetric id;
		class: #ratingTextInput;
		callback: [ :value | self addRating: value to: microMetric ]