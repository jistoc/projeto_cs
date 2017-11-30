const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/cliente');
const util = require('../util/util');

router.route('')
	  .get(util.jwtCheck,ClienteController.listar)
	  .post(util.jwtCheck,ClienteController.novo);

router.route('/:id')
	  .put(util.jwtCheck, ClienteController.alterar)
	  .delete(util.jwtCheck, ClienteController.remover)
	  .get(util.jwtCheck,ClienteController.getCliente);

module.exports = router;


