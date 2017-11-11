const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    modelHelper = require('../helpers/model.helper');


let UserSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [modelHelper.validateEmail, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
};

UserSchema.post('save', modelHelper.handleDuplicateKeyError);

module.exports = mongoose.model('User', UserSchema);