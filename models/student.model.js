const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    modelHelper = require('../helpers/model.helper');


let StudentSchema = new Schema({
    studentNumber: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [modelHelper.validateEmail, 'Invalid email address']
    },
    address: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

StudentSchema.post('save', modelHelper.handleDuplicateKeyError);

module.exports = mongoose.model('Student', StudentSchema);