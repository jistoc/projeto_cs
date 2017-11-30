const express = require('express');
const router = express.Router();
const TituloController = require('../controllers/titulo');
const util = require('../util/util');

router.route('')
	  .get(util.jwtCheck,TituloController.listar)
	  .post(util.jwtCheck,TituloController.novo);

router.route('/:id')
	  .put(util.jwtCheck, TituloController.alterar)
	  .delete(util.jwtCheck, TituloController.remover)
	  .get(util.jwtCheck,TituloController.getTitulo);

module.exports = router;


