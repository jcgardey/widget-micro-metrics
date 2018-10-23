api
updateWeight
    "Update the weights of the neuron based on the set of initial input. This method assumes that the receiver of the message invoking that method is the first hidden layer.
    We are now in the second hidden layers or in the output layer" 
    | inputs |
    inputs := self previousLayer neurons collect: #output.
        
    self updateWeight: inputs