const mongoose = require('mongoose');
const winston = require('winston');

class Mongoose {
    static configure() {
        const {MONGODB_URI} = process.env;

        mongoose.Promise = global.Promise;

        mongoose.connect(MONGODB_URI, {useMongoClient: true});
        mongoose.connection.once('open', () => winston.info('connection opened to %s', MONGODB_URI));
        mongoose.connection.on('close', () => winston.info('connection closed'));
        mongoose.connection.on('error', err => winston.error('connection error %s', err));
    }
}

module.exports = Mongoose;
