const mongoose = require('mongoose');
const {Schema} = mongoose;

const model = module.exports;

const answerSchema = new Schema ({
    channel: {type: String},
    numberOfChapters: {type: String},
    favouriteSerie: {type: String},
    accompaniedBy: {
        alone: Boolean,
        friends: Boolean,
        couple: Boolean,
        other: Boolean
    },
    age: {type: String},
    gender: {type: String},
    dailyHoursOfComputerUse: {type: String},
    levelOfExpertise: {type: String}
});

model.Answer = mongoose.model('answers', answerSchema);
