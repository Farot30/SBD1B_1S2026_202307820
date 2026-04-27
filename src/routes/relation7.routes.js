const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/relation7.controller');

router.get('/',                       ctrl.getAll);
router.post('/',                      ctrl.create);
router.delete('/:escuela/:centro',    ctrl.remove);

module.exports = router;
