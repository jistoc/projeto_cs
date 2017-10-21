const express = require('express');
const router = express.Router();
const ParceiroController = require('../controllers/parceiro');

router.route('')
	  .get(ParceiroController.index)
	  .post(ParceiroController.novo);

router.get('/all', ParceiroController.listar);


module.exports = router;
