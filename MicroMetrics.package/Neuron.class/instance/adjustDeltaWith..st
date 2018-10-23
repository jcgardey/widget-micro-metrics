api
adjustDeltaWith: anError
	delta := anError * (activationFunction derivative: output)