var express = require('express');
var router = express.Router();

const demo = require('./demo');

router.use('/', [demo]);

module.exports = router;
