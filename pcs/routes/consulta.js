const express = require('express');
const router = express.Router();
const TituloController = require('../controllers/titulo');
const util = require('../util/util');

router.route('/cliente/:cpf')
	  .get(TituloController.getTituloCliente);

router.route('/parceiro/:cpf')
	  .get(util.jwtCheck,TituloController.getTituloParceiro);

router.route('/situacao/:cpf/:id')
	  .get(util.jwtCheck,TituloController.getTituloSituacao);

module.exports = router;


