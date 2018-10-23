api
train: someInputs desiredOutputs: desiredOutputs
    "Train the neural network with a set of inputs and some expected output"
    | realOutputs t |
    realOutputs := self feed: someInputs.
    t := (1 to: desiredOutputs size) collect: 
            [ :i | ((desiredOutputs at: i) - (realOutputs at: i)) raisedTo: 2 ].
    self backwardPropagateError: desiredOutputs.
    self updateWeight: someInputs.