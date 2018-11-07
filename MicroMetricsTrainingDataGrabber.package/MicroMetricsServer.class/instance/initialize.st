initialization
initialize
	super initialize.
	metrics := OrderedCollection new.
	grabbers := Dictionary new
		at: #TextInput put: TextInputGrabber new;
		at: #SelectInput put: SelectInputGrabber new;
		yourself