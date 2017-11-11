const express = require('express'),
    router = express.Router(),
    ObjectId = require('mongoose').Schema.Types.ObjectId,
    authHelper = require('../helpers/auth.helper');


const studentCtrl = require('../controllers/student.controller');
router.all('/:id', (req, res, next)=> {
    try {
        ObjectId(req.params.id);
        next();
    } catch (e) {
        console.error('Invalid mongo object id');
    }
});
router.get('/', authHelper.ensureAuthenticated, studentCtrl.findAll);
router.get('/:id', authHelper.ensureAuthenticated, studentCtrl.findOne);
router.post('/', authHelper.ensureAuthenticated, studentCtrl.create);
router.post('/bulk', authHelper.ensureAuthenticated, studentCtrl.createBulk);
router.put('/:id', authHelper.ensureAuthenticated, studentCtrl.update);
router.delete('/:id', authHelper.ensureAuthenticated, studentCtrl.delete);

module.exports = router;
