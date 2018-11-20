const express = require('express');
const router = express.Router();
const listeningCtrl = require('../controllers/listening.controller');
const IdChecker = require('../commons/utils');

router.get('/', listeningCtrl.getAll);
router.get('/:id', IdChecker.check, listeningCtrl.getOne);
router.post('/', listeningCtrl.create);
router.put('/:id', IdChecker.check, listeningCtrl.update);
router.delete('/:id', IdChecker.check, listeningCtrl.delete);
module.exports = router;