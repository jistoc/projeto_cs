const express = require('express');
const router = express.Router();
const ParceiroController = require('../controllers/parceiro');
const util = require('../util/util');

router.route('')
	  .get(util.jwtCheck,ParceiroController.getParca)
	  .post(ParceiroController.novo)
	  .put(util.jwtCheck, ParceiroController.alterar)
	  .delete(util.jwtCheck, ParceiroController.remover);



module.exports = router;


