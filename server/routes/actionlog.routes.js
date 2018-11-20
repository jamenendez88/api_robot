const express = require('express');
const router = express.Router();
const actionlogCtrl = require('../controllers/actionlog.controller');
const IdChecker = require('../commons/utils');

router.get('/', actionlogCtrl.getAll);
router.get('/:id', IdChecker.check, actionlogCtrl.getOne);
/* router.post('/', actionlogCtrl.create); */
router.put('/:id', IdChecker.check, actionlogCtrl.update);
router.delete('/:id', IdChecker.check, actionlogCtrl.delete);
module.exports = router;