rendering
renderMetricsSummaryFor: aSample on: html
	| byType |
	html heading level4 with: aSample websiteName.
	byType := aSample metrics groupedBy: #widgetType.
	byType
		keysAndValuesDo: [ :type :metrics | 
			html tbsLabel
				beSuccessIf: type = 'TextInput';
				beInfoIf: type = 'SelectInput';
				beWarningIf: type = 'RadioSet';
				beDangerIf: type = 'Anchor';
				bePrimaryIf: type = 'Datepicker';
				bePrimaryIf: type = 'DateSelect';
				title: type;
				with: metrics size.
			html space ]