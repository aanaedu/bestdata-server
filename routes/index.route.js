const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.send('Welcome to students api');
});

module.exports = router;
