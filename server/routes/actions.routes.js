const express = require('express');
const router = express.Router();
const actionsCtrl = require('../controllers/actions.controller');
const IdChecker = require('../commons/utils');

router.get('/', actionsCtrl.getAll);
router.get('/:id', IdChecker.check, actionsCtrl.getOne);
router.post('/', actionsCtrl.create);
router.put('/:id', IdChecker.check, actionsCtrl.update);
router.delete('/:id', IdChecker.check, actionsCtrl.delete);
module.exports = router;