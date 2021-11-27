var express = require('express');
var router = express.Router();

router.use('/list', require('./list'))
router.use('/prize', require('./prize'))
router.use('/result', require('./result'))

module.exports = router;
