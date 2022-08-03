baselines
baseline: spec
	<baseline>
	spec
		for: #common
		do: [ self
				grease: spec;
				seaside: spec;
				bootstrap: spec;
				teapot: spec;
				voyage: spec;
				neoCSV: spec;
				zincAWS: spec.
			spec
				package: 'MicroMetricsTrainingDataGrabber'
				with:
					[ spec requires:
							#('Seaside3' 'Seaside-REST-Core' 'Bootstrap-Core' 'Bootstrap-Widgets' 'Teapot' 'Voyage' 'NeoCSV' 'Zinc-AWS') ].
			spec group: 'default' with: #('MicroMetricsTrainingDataGrabber').
			spec postLoadDoIt: #postLoadActions ]