const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/consultas.controller');

router.get('/estadisticas-centro',      ctrl.estadisticasCentro);
router.get('/ranking-evaluados',        ctrl.rankingEvaluados);
router.get('/pregunta-menor-aciertos',  ctrl.preguntaMenorAciertos);

module.exports = router;
