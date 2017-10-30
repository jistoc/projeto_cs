const express = require('express');
const router = express.Router();
const ParceiroController = require('../controllers/parceiro');

router.route('')
	  .get(ParceiroController.listar)
	  .post(ParceiroController.novo);



module.exports = router;
