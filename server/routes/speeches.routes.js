const express = require('express');
const router = express.Router();
const speechesCtrl = require('../controllers/speeches.controller');
const IdChecker = require('../commons/utils');

router.get('/', speechesCtrl.getAll);
router.get('/:id', IdChecker.check, speechesCtrl.getOne);
router.post('/', speechesCtrl.create);
router.put('/:id', IdChecker.check, speechesCtrl.update);
router.delete('/:id', IdChecker.check, speechesCtrl.delete);
module.exports = router;