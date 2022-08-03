accessing
questionnaireScore
	^ ((questionnaire at: #question_1) asInteger
		+ (questionnaire at: #question_2) asInteger) / 2