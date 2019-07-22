const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const model = module.exports;

const logSchema = new Schema ({
    events: {type: Object},
    answers: {type: ObjectId, ref: 'answers'},
    user: {type: ObjectId, ref: 'users'},
    createdAt: {type: Date, default: Date.now}
}, {collection: 'logs', timestamps: true});


model.Log = mongoose.model('logs', logSchema);
