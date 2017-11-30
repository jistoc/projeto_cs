const Titulo = require('../models/titulo');
const Parceiro = require('../models/parceiro');
const decode = require('jwt-decode');
module.exports = {
	novo : (req,res,next) => {

		console.log(req.body);

		if( !req.body.id_parceiro || !req.body.id_cliente
			|| !req.body.valor || !req.body.data_emissao 
			|| !req.body.descricao || !req.body.situacao ){

			res.status(400).json({mensagem : "corpo do pedido inválido!"});
			return;
		}

		req.checkBody("descricao", "Descrição inválida!").isLength({ max: 255 });
		req.checkBody("valor", "Valor inválido!").isLength({ min: 2 });
		req.checkBody("data_emissao", "Data Emissão inválida!").matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);

		let errors = req.validationErrors();

		if (errors) {
			let msg = '';
			errors.forEach((erro) => {
				msg += erro.msg + '<br>';
			});
			res.status(422).json({mensagem : msg});
		} else {
			Titulo.create(req.body, (err,id) => {

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
		let token = decode(req.headers['authorization']);
		Titulo.getAll( token.id_parceiro, (err,result) => {
			if(err) 
				res.status(500).json({mensagem:err});
			else
				res.status(200).json(result);
		});	
	},
	alterar : (req,res,next) => {


		if( !req.body.valor || !req.body.data_emissao 
			|| !req.body.descricao || !req.body.situacao ){

			res.status(400).json({mensagem : "corpo do pedido inválido!"});
			return;
		}

		Parceiro.checkToken(req.headers['authorization'], (err,rows) => {
			if(rows.length>0){
				return res.status(401).json({mensagem:'Token inválido!'});
			} 
			req.checkBody("descricao", "Descrição inválida!").isLength({ max: 255 });
			req.checkBody("valor", "Valor inválido!").isLength({ min: 2 });
			req.checkBody("data_emissao", "Data Emissão inválida!").matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);



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
				dados.id_titulo = req.params.id;
				Titulo.alterar(dados, (err,result) => {
					if(result>0){

						return res.status(200).json({mensagem:'Dados alterados com sucesso!'});
					}
					if(err){
						res.status(500).json({mensagem:'Falha ao alterar dados!'});
					}
				})
			}
		
		});


	},
	remover : (req,res,next) => {
		let token = decode(req.headers['authorization']);
		Titulo.remover(req.params.id, (err,result) => {
			if(result>0){

				return res.status(200).json({mensagem:'Titulo removido com sucesso!'});
			}
			if(err){
				res.status(500).json({mensagem:'Falha ao remover titulo!'});
			}
		})
	},
	getTitulo : (req,res,next) => {
		let token = decode(req.headers['authorization']);
		Titulo.getTitulo(req.params.id, (err,result) => {
			if(result){

				return res.status(200).json( result);
			}
			if(err){
				res.status(500).json({mensagem:'Falha ao acessar titulo!'});
			}
		})
	}
}