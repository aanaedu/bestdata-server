const User = require('../models/user.model'),
    ObjectId = require('mongoose').Schema.ObjectId,
    bcrypt = require('bcrypt'),
    config = require('../config/config');


exports.create = function (req, res) {
    let user = {};
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;


    Object.keys(user).forEach(function (key) {
        let item = user[key];
        if (!item && item.trim().length === 0) {
            res.status(400).json({error: {messages: [`${key.toUpperCase()} is a required field.`]}});
        }
    }, this);

    let newUser = new User(user);

    newUser.save((err, user) => {
        if (err) return res.status(500).send({error: {messages: [err.message || err]}});
        res.json(user);
    });
};

exports.findAll = function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(404).send({error: {messages: [err.message || err]}});
        }
        res.json(users);
    })
};

exports.findOne = function (req, res) {
    const id = req.params.id;
    User.find({_id: id}, (err, user) => {
        if (err) {
            return res.status(404).send({error: {messages: [err.message || err]}});
        }
        res.json(user);
    })
};

exports.update = function (req, res) {
    let id = req.params.id;
    let modifiedUser = {};

    if (req.body.firstName) {
        modifiedUser.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        modifiedUser.lastName = req.body.lastName;
    }
    if (req.body.email) {
        modifiedUser.email = req.body.email;
    }
    if (req.body.password) {
        modifiedUser.password = bcrypt.hashSync(req.body.password, config.SALT_ROUNDS);
    }

    Object.keys(modifiedUser).forEach(function (key) {
        let item = modifiedUser[key]
        if (!item && item.trim().length === 0) {
            res.status(400).json({error: {messages: [`${key.toUpperCase()} is a required field.`]}});
        }
    }, this);


    User.findByIdAndUpdate({_id: id}, modifiedUser, {upsert: true, new: true}, (err, user) => {
        if (err) res.status(500).send({error: {messages: [err.message || err]}});
        res.json(user);
    });

};

exports.delete = function (req, res) {
    let id = req.params.id;

    User.findOneAndRemove({_id: id}, (err, user) => {
        if (err) {
            res.status(500).send({error: {messages: [err.message || err]}});
        } else if (!user) {
            return res.status(404).send({ message: 'Error: No User record found.'})
        }
        res.send({message: 'User was deleted successfully!'});
    })
};