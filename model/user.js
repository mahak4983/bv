const mongoose = require('mongoose');

const userName = require('../validation/name');
const emailId = require('../validation/email');
const addressValid = require('../validation/address');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (name) => userName.validator(name),
            msg: userName.errMessage,
        },
    },
    
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => emailId.validator(email),
            msg: emailId.errMessage,
        },
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        validate: {
            validator: (address) => addressValid.validator(address),
            msg: addressValid.errMessage,
        },

    }
});

const user = mongoose.model('user', schema);

module.exports = user;
