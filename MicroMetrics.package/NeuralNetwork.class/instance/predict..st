api
predict: inputs
    "Make a prediction. This method assume that the number of outputs is the same than the number of different values the network can output"
    "The index of a collection begins at 1 in Pharo"
    | outputs |
    outputs := self feed: inputs.
    ^ (outputs indexOf: (outputs max)) - 1