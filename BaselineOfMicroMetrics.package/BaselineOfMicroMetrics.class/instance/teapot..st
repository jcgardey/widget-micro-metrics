as yet unclassified
teapot: spec
	 spec
		baseline: 'Teapot'
			with: [ spec
				repository: 'github://zeroflag/Teapot/source';
				loads: #('Deployment') ];
		import: 'Teapot'