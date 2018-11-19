const express = require('express');
const router = express.Router();
const emotionCtrl = require('../controllers/emotion.controller');
const IdChecker = require('../commons/utils');

router.get('/', emotionCtrl.getAll);
router.get('/:id', IdChecker.check, emotionCtrl.getOne);
router.post('/', emotionCtrl.create);
router.put('/:id', IdChecker.check, emotionCtrl.update);
router.delete('/:id', IdChecker.check, emotionCtrl.delete);
module.exports = router;