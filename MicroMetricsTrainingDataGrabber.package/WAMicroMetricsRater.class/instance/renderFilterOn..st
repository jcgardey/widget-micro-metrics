rendering
renderFilterOn: html
	html tbsForm beInline
		class: #toggle;
		with: [ html span: 'Filter '.
			html textInput tbsFormControl
				placeholder: 'id, website or widget kind';
				onKeyUp:
					(html jQuery ajax serializeThis
						callback: [ :value | searchTerm := value ]
							value: html jQuery this value;
						script: [ :s | 
							self updateSamples.
							s << (s jQuery: #samples)
								html: [ :renderer | self renderSamplesListOn: renderer ] ]) ]