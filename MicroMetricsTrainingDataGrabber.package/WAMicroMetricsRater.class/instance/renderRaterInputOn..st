rendering
renderRaterInputOn: html
	html
		fieldSet: [ html
				tbsInputGroup: [ html heading level4 with: 'Rater ID'.
					html textInput tbsFormControl on: #raterId of: self ] ]