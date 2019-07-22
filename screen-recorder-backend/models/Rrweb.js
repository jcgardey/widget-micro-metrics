const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const model = module.exports;

const rrwebSchema = new Schema ({
    screencastId: {type: Object},
    screencastName: {type: String},
    events: {type: Object},
    url: {type: String},
    createdAt: {type: Date, default: Date.now}
}, {collection: 'rrweb', timestamps: true});


model.Rrweb = mongoose.model('rrweb', rrwebSchema);
