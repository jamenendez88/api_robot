const express = require('express');
const router = express.Router();
const emotionsCtrl = require('../controllers/emotions.controller');
const IdChecker = require('../commons/utils');

router.get('/', emotionsCtrl.getAll);
router.get('/:id', IdChecker.check, emotionsCtrl.getOne);
router.post('/', emotionsCtrl.create);
router.put('/:id', IdChecker.check, emotionsCtrl.update);
router.delete('/:id', IdChecker.check, emotionsCtrl.delete);
module.exports = router;