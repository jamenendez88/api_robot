const express = require('express');
const router = express.Router();
const actionCtrl = require('../controllers/action.controller');
const IdChecker = require('../commons/utils');

router.get('/', actionCtrl.getAll);
router.get('/:id', IdChecker.check, actionCtrl.getOne);
router.post('/', actionCtrl.create);
router.post('/:id', IdChecker.check, actionCtrl.perform);
router.put('/:id', IdChecker.check, actionCtrl.update);
router.delete('/:id', IdChecker.check, actionCtrl.delete);
module.exports = router;