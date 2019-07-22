const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const model = module.exports;

const userSchema = new Schema ({
    googleId: {type: String, unique: true, sparse: true},
    email: {type: String, required: true},
    password: {type: String},
    name: String,
    surname: String,
    phone: String,
    address: String,
    enabled: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
}, {collection: 'users', timestamps: true});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    console.log('this password: ', this.password);
    return bcrypt.compareSync(password, this.password);
};

model.Users = mongoose.model('users', userSchema);
