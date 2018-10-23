api
adjustWeightWithInput: inputs learningRate: learningRate
    inputs withIndexDo: [ :anInput :index | 
        weights at: index put: ((weights at: index) + (learningRate * delta * anInput)) ]
