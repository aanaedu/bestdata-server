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
        console.error(e);
    }
});

router.get('/', authHelper.ensureAuthenticatedAdmin, UserCtrl.findAll);
router.get('/:id', authHelper.ensureAuthenticatedAdmin, UserCtrl.findOne);
router.post('/', authHelper.ensureAuthenticatedAdmin, UserCtrl.create);
router.put('/:id', authHelper.ensureCurrentUserOrAdmin, UserCtrl.update);
router.delete('/:id', authHelper.ensureAuthenticatedAdmin, UserCtrl.delete);

module.exports = router;
