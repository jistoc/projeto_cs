const express = require('express');
const router = express.Router();
const ParceiroController = require('../controllers/parceiro');
const util = require('../util/util');

router.route('/login')
	  .put(ParceiroController.login);

router.route('/logout')
	  .put(util.jwtCheck,ParceiroController.logout);

module.exports = router;
