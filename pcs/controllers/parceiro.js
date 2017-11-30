const Parceiro = require('../models/parceiro');
const decode = require('jwt-decode');
module.exports = {
	novo : (req,res,next) => {


		if( !req.body.email || !req.body.razao_social || 
			!req.body.senha || !req.body.nome_fantasia || 
			!req.body.nome_usuario || !req.body.cnpj ){

			res.status(400).json({mensagem : "corpo do pedido inválido!"});
			return;
		}

		req.checkBody("email", "E-mail inválido!").isEmail();
		req.checkBody("razao_social", "Nome social inválido!").isLength({ max: 255 });
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
			res.status(422).json({mensagem : msg});
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
		res.json({mensagem:'index parceiro'});
	},
	listar : (req,res,next) => {
		Parceiro.getAll( (err,parceiros) => {
			if(err) 
				res.status(500).json({mensagem:err});
			else
				res.status(200).json(parceiros);
		});	
	},
	alterar : (req,res,next) => {


		Parceiro.checkToken(req.headers['authorization'], (err,rows) => {
			if(rows.length>0){
				return res.status(401).json({mensagem:'Token inválido!'});
			} else {
				if( !req.body.email || !req.body.razao_social || 
					!req.body.senha || !req.body.nome_fantasia){

					res.status(400).json({mensagem : "corpo do pedido inválido!"});
				return;
			}

			req.checkBody("email", "E-mail inválido!").isEmail();
			req.checkBody("razao_social", "Nome social inválido!").isLength({ max: 255 });
			req.checkBody("nome_fantasia", "Nome Fantasia inválido!").isLength({ max: 255});
			req.checkBody("senha", "Sennha inválida!").isLength({ max: 255 });


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
				dados.id_usuario = token.id_usuario;
				Parceiro.alterar(dados, (err,result) => {
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
	login : (req,res,next) => {
		if( !req.body.nome_usuario || !req.body.senha) {
			res.status(400).json({mensagem : "corpo do pedido inválido!"});
			return;
		}


		req.checkBody("nome_usuario", "Usuário inválido!").isLength({ max: 255 });
		req.checkBody("senha", "Senha inválida!").isLength({ max: 255 });
		let errors = req.validationErrors();

		if (errors) {
			let msg = '';
			errors.forEach((erro) => {
				msg += erro.msg + '<br>';
			});
			res.status(422).json({mensagem : msg});
		} else {	
			Parceiro.login({nome_usuario : req.body.nome_usuario, senha : req.body.senha}, (err,result) => {
				if(err){
					switch(err){
						case 404 : res.status(404).json({mensagem : 'Usuário não cadastrado!'}); break;
						case 401 : res.status(404).json({mensagem : 'Senha inválida!'}); break;
						default : res.status(500).json({mensagem : 'Erro interno!'}); break;
					}
				} else {

					res.status(200).json({token : "JWT " +result});
				}

			})
		}

	},
	logout : (req,res,next) => {

		Parceiro.checkToken(req.headers['authorization'], (err,rows) => {
			if(rows.length>0){
				return res.status(401).json({mensagem:'Token inválido!'});
			} else {
				Parceiro.logout(req.headers['authorization'], (err,result) => {

					if(result>0){
						return res.status(200).json({mensagem:'Logout realizado com sucesso!'});
					}
					if(err){
						console.log(err)
						res.status(500).json({mensagem:'Falha ao realizar logout!'});
					}
				})
			}
		});



	},
	remover : (req,res,next) => {
		let token = decode(req.headers['authorization']);
		Parceiro.remover(token.id_usuario, (err,result) => {
			if(result>0){

				return res.status(200).json({mensagem:'Usuário removido com sucesso!'});
			}
			if(err){
				res.status(500).json({mensagem:'Falha ao remover usuário!'});
			}
		})
	},
	getParca : (req,res,next) => {
		let token = decode(req.headers['authorization']);
		Parceiro.getUsuario(token.nome, (err,result) => {
			if(result){

				return res.status(200).json( result);
			}
			if(err){
				res.status(500).json({mensagem:'Falha ao acessar usuário!'});
			}
		})
	}
}