const jwt = require('jsonwebtoken'),
    config = require('../config/config');

exports.ensureAuthenticated = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.body.token || req.params.token || req.query.token;
    if (token) {
        jwt.verify(token, config.secret, function (err, decodedToken) {
            if (err) {
                return res.status(403).send({ valid: false, message: "Failed to authenticate token." });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        return res.status(403).send({ valid: false, message: "No token provided." });
    }
};

exports.ensureAuthenticatedAdmin = function (req, res, next) {
    if (req.decodedToken && req.decodedToken.isAdmin) {
        next();
    } else {
        res.status(403).send({ valid: false, message: "Access Denied!" });
    }
}

exports.ensureCurrentUserOrAdmin = function (req, res, next) {
    if (req.decodedToken) {
        const isCurrentUserOrAdmin = (req.params.id === req.decodedToken._id) || req.decodedToken.isAdmin;
        if (isCurrentUserOrAdmin) {
            next();
        } else {
            res.status(403).send({ valid: false, message: "Access Denied: Unauthorised request." });
        }
    } else {
        res.status(403).send({ valid: false, message: "Access Denied!" });
    }
}