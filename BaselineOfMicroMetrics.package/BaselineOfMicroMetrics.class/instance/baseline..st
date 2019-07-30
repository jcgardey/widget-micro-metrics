baselines
baseline: spec
	<baseline>
	spec
		for: #common
		do: [ self
				seaside: spec;
				bootstrap: spec;
				teapot: spec;
				voyage: spec.
			spec
				package: 'MicroMetricsTrainingDataGrabber'
				with: [ spec requires: #('Seaside3' 'Bootstrap' 'Teapot''Voyage') ].
			spec postLoadDoIt: #postLoadActions ]