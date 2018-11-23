rendering
renderRaterInputOn: html
	html
		fieldSet: [ html tbsInputGroup
				id: #raterIdGroup;
				with: [ html heading level4
						class: 'control-label';
						with: 'Rater ID'.
					html textInput tbsFormControl
						id: #raterId;
						on: #raterId of: self ] ]