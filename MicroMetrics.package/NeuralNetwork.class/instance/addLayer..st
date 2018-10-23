accessing
addLayer: aNeuronLayer
	self layers
		ifNotEmpty: [ aNeuronLayer previousLayer: self lastLayer.
			self lastLayer nextLayer: aNeuronLayer ].
	self layers add: aNeuronLayer