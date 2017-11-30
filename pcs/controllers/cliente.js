const Cliente = require('../models/cliente');
const Parceiro = require('../models/parceiro');
const decode = require('jwt-decode');
module.exports = {
	novo : (req,res,next) => {


		if( !req.body.cpf || !req.body.nome_cliente ){

			res.status(400).json({mensagem : "corpo do pedido inválido!"});
			return;
		}

		req.checkBody("nome_cliente", "Nome inválido!").isLength({ max: 255 });
		req.checkBody("cpf", "CPF inválido!").isLength({ max: 14, min: 11});


		let errors = req.validationErrors();

		if (errors) {
			let msg = '';
			errors.forEach((erro) => {
				msg += erro.msg + '<br>';
			});
			res.status(422).json({mensagem : msg});
		} else {
			Cliente.create(req.body, (err,id) => {

				let msg = 'Falha Interna';
				if(err) {

					switch(err.errno){
						case 1062 :
						msg =  err.sqlMessage
						.substring(err.sqlMessage.indexOf("key ")+4)
						.toUpperCase()
						.replace("'","")
						.replace("'","");

						if(msg=='NOME')
							msg = 'Cliente';

						msg += " já cadastrado!";
						res.status(422).json({mensagem: msg});
						return;
						break;

					}

					res.status(500).json({mensagem: err});
				}
				else
					res.status(200).json({mensagem:'ID ' + id + ' cadastrado'});
			});	
		}

	},
	index : (req,res,next) => {
		res.json({mensagem:'index Cliente'});
	},
	listar : (req,res,next) => {
		Cliente.getAll( (err,result) => {
			if(err) 
				res.status(500).json({mensagem:err});
			else
				res.status(200).json(result);
		});	
	},
	alterar : (req,res,next) => {


		Parceiro.checkToken(req.headers['authorization'], (err,rows) => {
			if(rows.length>0){
				return res.status(401).json({mensagem:'Token inválido!'});
			} else {
				if( !req.body.cpf || !req.body.nome_cliente){
					res.status(400).json({mensagem : "corpo do pedido inválido!"});
				return;
			}


			req.checkBody("nome_cliente", "Nome inválido!").isLength({ max: 255 });
			req.checkBody("cpf", "CPF inválido!").isLength({ max: 14, min: 11});


			let errors = req.validationErrors();

			if (errors) {
				let msg = '';
				errors.forEach((erro) => {
					msg += erro.msg + '<br>';
				});
				res.status(422).json({mensagem : msg});
			} else {
				let token = decode(req.headers['authorization']);
				let dados = req.body;
				dados.id_cliente = req.params.id;
				Cliente.alterar(dados, (err,result) => {
					if(result>0){

						return res.status(200).json({mensagem:'Dados alterados com sucesso!'});
					}
					if(err){
						res.status(500).json({mensagem:'Falha ao alterar dados!'});
					}
				})
			}
		}
	});


	},
	remover : (req,res,next) => {
		let token = decode(req.headers['authorization']);
		Cliente.remover(req.params.id, (err,result) => {
			if(result>0){

				return res.status(200).json({mensagem:'Cliente removido com sucesso!'});
			}
			if(err){
				res.status(500).json({mensagem:'Falha ao remover cliente!'});
			}
		})
	},
	getCliente : (req,res,next) => {
		let token = decode(req.headers['authorization']);
		Cliente.getCliente(req.params.id, (err,result) => {
			if(result){

				return res.status(200).json( result);
			}
			if(err){
				res.status(500).json({mensagem:'Falha ao acessar cliente!'});
			}
		})
	}
}