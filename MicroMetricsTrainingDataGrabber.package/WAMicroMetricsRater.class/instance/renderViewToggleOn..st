rendering
renderViewToggleOn: html
	html tbsForm beInline
		class: #toggle;
		with: [ html tbsButtonGroup beExtraSmall
				with: [ html tbsButton
						beDefault;
						class: #active if: self compactView;
						class: 'btn-primary' if: self compactView;
						callback: [ self compactView: true ];
						with: 'Compact'.
					html tbsButton
						beDefault;
						class: #active if: self compactView not;
						class: 'btn-success' if: self compactView not;
						callback: [ self compactView: false ];
						with: 'Detailed' ] ]