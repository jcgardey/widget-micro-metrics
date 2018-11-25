as yet unclassified
viewErrorCurve
	| b ds |
    errors ifEmpty: [ 
        ^ RTView new 
            add: (RTLabel elementOn: 'Should first run the network'); 
            yourself ].
    
    b := RTGrapher new.
    
    "We define the size of the charting area"
    b extent: 500 @ 300.
    
    ds := RTData new.
    ds noDot. 
    ds connectColor: Color blue.
    ds points: errors.
    ds dotShape rectangle color: Color blue.
    b add: ds.
    
    b axisX noDecimal; title: 'Epoch'.
    b axisY title: 'Error'.
    ^ b