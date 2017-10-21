const Parceiro = require('../models/parceiro');

module.exports = {
	novo : (req,res,next) => {


		if( !req.body.email || !req.body.nome_social || 
		    !req.body.senha || !req.body.nome_fantasia || 
		    !req.body.nome_usuario || !req.body.cnpj ){

			res.status(400).json({message : "corpo do pedido inválido!"});
			return;

		}

		req.checkBody("email", "E-mail inválido!").isEmail();
		req.checkBody("nome_social", "Nome social inválido!").isLength({ max: 255 });
		req.checkBody("nome_fantasia", "Nome Fantasia inválido!").isLength({ max: 255});
		req.checkBody("nome_usuario", "Usuário inválido!").isLength({ max: 255 });
		req.checkBody("senha", "Sennha inválida!").isLength({ max: 255 });
		req.checkBody("cnpj", "Cnpj inválido!").matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/);


		let errors = req.validationErrors();

		if (errors) {
			let msg = '';
			errors.forEach((erro) => {
				msg += erro.msg + '<br>';
			});
			res.status(422).json({message : msg});
		} else {
			Parceiro.create(req.body, (err,id) => {
				
				let msg = 'Falha Interna';
			 	if(err) {
			 		
			 		switch(err.errno){
			 			case 1062 :
								msg =  err.sqlMessage
											.substring(err.sqlMessage.indexOf("key ")+4)
											.toUpperCase()
											.replace("'","")
											.replace("'","");

								if(msg=='NOME_USUARIO')
									msg = 'Usuário';

								msg += " já cadastrado!";
								res.status(409).json({message: msg});
								return;
			 				break;

			 		}

			 		res.status(500).json({message: msg});
			 	}
			 	else
			 		res.status(200).json({message:'ID ' + id + ' cadastrado'});
			});	
		}

	},
	index : (req,res,next) => {
		res.json({message:'index parceiro'});
	},
	listar : (req,res,next) => {
		Parceiro.getAll( (err,parceiros) => {
		 	if(err) 
		 		res.status(500).json({message:err});
		 	else
		 		res.status(200).json(parceiros);
		});	
	}
}