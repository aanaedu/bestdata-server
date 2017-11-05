const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const studentCtrl = require('../controllers/student.controller');
router.all('/:id', (req, res, next)=> {
    try {
        ObjectId(req.params.id);
        next();
    } catch (e) {
        console.error(e);
    }
});
router.get('/', studentCtrl.findAll);
router.get('/:id', studentCtrl.findOne);
router.post('/', studentCtrl.create);
router.post('/bulk', studentCtrl.createBulk);
router.put('/:id', studentCtrl.update);
router.delete('/:id', studentCtrl.delete);

module.exports = router;
