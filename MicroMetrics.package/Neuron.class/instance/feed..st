api
feed: inputs
	| z |
	z := (inputs with: self weights collect: [ :input :weight | input * weight ]) sum
		+ self bias.
	self output: (activationFunction eval: z).
	^ output