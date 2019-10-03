initialization
initialize
	super initialize.
	self storeInVoyage.
	grabbers := Dictionary new
		at: #TextInput put: TextInputGrabber new;
		at: #SelectInput put: SelectInputGrabber new;
		at: #Anchor put: AnchorGrabber new;
		yourself