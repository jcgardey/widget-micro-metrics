accessing-dynamic
stats
	| d |
	d := Dictionary new.
	d at: #id put: self id.
	d at: #finished put: taskCompleted.
	d at: #time put: duration asSeconds.
	d at: #errors put: errors.
	questionnaire
		ifNotNil: [ d at: #questionnaire put: self questionnaireScore.
			d at: #age put: (questionnaire at: #age).
			d at: #hours put: (questionnaire at: #hours) ].
	^ d