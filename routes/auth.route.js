const express = require('express'),
    router = express.Router(),
    authCtrl = require('../controllers/auth.controller'),
    authHelper = require('../helpers/auth.helper');

router.get('/me', authHelper.ensureAuthenticated, authCtrl.getPayload);
router.post('/', authCtrl.authenticate);

module.exports = router;
