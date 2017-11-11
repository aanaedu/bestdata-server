const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user.controller');
const authHelper = require('../helpers/auth.helper');

const ObjectId = require('mongoose').Schema.Types.ObjectId;

router.all('/:id', (req, res, next)=> {
    try {
        ObjectId(req.params.id);
        next();
    } catch (e) {
        console.error('Invalid mongo object id');
    }
});

router.get('/', authHelper.ensureAuthenticated, authHelper.ensureAuthenticatedAdmin, UserCtrl.findAll);
router.get('/:id', authHelper.ensureAuthenticated, authHelper.ensureAuthenticatedAdmin, UserCtrl.findOne);
router.post('/', authHelper.ensureAuthenticated, authHelper.ensureAuthenticatedAdmin, UserCtrl.create);
router.put('/:id', authHelper.ensureAuthenticated, authHelper.ensureCurrentUserOrAdmin, UserCtrl.update);
router.delete('/:id', authHelper.ensureAuthenticated, authHelper.ensureAuthenticatedAdmin, UserCtrl.delete);

module.exports = router;
