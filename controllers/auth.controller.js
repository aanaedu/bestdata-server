const jwt = require('jsonwebtoken'),
    User = require('../models/user.model'),
    config = require('../config/config');

exports.authenticate = (req, res) => {
    User.findOne({email: req.body.email})
        .select('firstName email password isAdmin')
        .exec((err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({
                    valid: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                user.comparePassword(req.body.password).then(function (validPassword) {
                    if (!validPassword) {
                        res.json({
                            valid: false,
                            message: 'Authentication failed. Wrong email or password.'
                        });
                    } else {
                        let token = jwt.sign({
                            _id: user._id,
                            firstName: user.firstName,
                            email: user.email,
                            isAdmin: user.isAdmin
                        }, config.secret, {
                            expiresIn: 1440
                        });
                        res.json({
                            valid: true,
                            token: token
                        });
                    }
                }).catch(function (err) {
                    throw new Error(err);
                });
            }
        })
};

exports.getPayload = (req, res) => {
    if (req.decodedToken) {
        res.send(req.decodedToken);
    } else {
        res.send({});
    }
};