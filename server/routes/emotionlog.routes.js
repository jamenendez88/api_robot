const express = require('express');
const router = express.Router();
const emotionlogCtrl = require('../controllers/emotionlog.controller');
const IdChecker = require('../commons/utils');

router.get('/', emotionlogCtrl.getAll);
router.get('/:id', IdChecker.check, emotionlogCtrl.getOne);
/* router.post('/', emotionlogCtrl.create); */
router.put('/:id', IdChecker.check, emotionlogCtrl.update);
router.delete('/:id', IdChecker.check, emotionlogCtrl.delete);
module.exports = router;