const express = require('express');
const router = express.Router();
const speechCtrl = require('../controllers/speech.controller');
const IdChecker = require('../commons/utils');

router.get('/', speechCtrl.getAll);
router.get('/:id', IdChecker.check, speechCtrl.getOne);
router.post('/', speechCtrl.create);
router.put('/:id', IdChecker.check, speechCtrl.update);
router.delete('/:id', IdChecker.check, speechCtrl.delete);
module.exports = router;