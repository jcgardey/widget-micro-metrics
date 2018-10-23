roassal
viewNetwork
    | b lb |
    b := RTMondrian new.
    
    b nodes: layers forEach: [ :aLayer |
        b shape circle size: 20.
        b nodes: aLayer neurons.
        b layout verticalLine.
    ].

    b shape arrowedLine; withShorterDistanceAttachPoint.
    b edges connectTo: #nextLayer.
    b layout horizontalLine gapSize: 30; center.
    
    b build.
    
    lb := RTLegendBuilder new.
    lb view: b view.
    lb addText: self numberOfNeurons asString, ' neurons'.
    lb addText: self numberOfInputs asString, ' inputs'.
    lb build.
    ^ b view