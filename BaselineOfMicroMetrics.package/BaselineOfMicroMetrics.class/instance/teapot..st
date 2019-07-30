as yet unclassified
teapot: spec
	spec
		baseline: 'Teapot'
			with: [ spec
				repository: 'github://zeroflag/Teapot:v2.6.0/source';
				loads: #('Deployment') ];
		import: 'Teapot'