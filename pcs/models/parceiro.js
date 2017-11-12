var db = require('../config/db.js')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const key  = require('./../config/key.json');

exports.alterar = function(dados,done) {
	let sql = "UPDATE usuario SET email = ?, senha = ? WHERE id_usuario = ?";
	var count = 0;
	db.get().getConnection( (err,connection) => {
		if(err) return done(err);

		connection.beginTransaction( (err) => {
			if(err) return done(err);

			connection.query(sql,[dados.email,dados.senha,dados.id_usuario],  (err,result) =>{
				if (err){
					count++;
					connection.rollback(()=>{
						return done(err);
					})
				} else {
					sql = "UPDATE parceiro SET nome_fantasia = ?, razao_social = ? WHERE id_usuario = ?";
					connection.query(sql,[dados.nome_fantasia,dados.razao_social,dados.id_usuario], (err,result) => {
						if (err) {
							connection.rollback(()=>{
								return done(err);
							});
						} else { 
							connection.commit((err) => {

								if (err){
									connection.rollback(()=>{
										return done(err);
									})
								}

								connection.release();
							});
							return done(null, ++count)
						}
					});
				}

			});
			
		})
	});
}

exports.create = function(dados, done) {
	
	let keys = Object.keys(dados);
	let values = keys.map(function(key) { return "'" + dados[key] + "'" })

	let sql = "INSERT INTO usuario (nome,email,senha) VALUES ('" ;
	sql += dados.nome_usuario + "','";
	sql += dados.email+ "','";
	sql += dados.senha+"')";

	db.get().getConnection( (err,connection) => {
		if(err) return done(err);

		connection.beginTransaction( (err) => {
			if(err) return done(err);

			connection.query(sql, (err,result) =>{
				if (err){
					connection.rollback(()=>{
						return done(err);
					})
				} else {
					sql = "INSERT INTO parceiro (cnpj,nome_fantasia,razao_social,nome_usuario,id_usuario) values ('";
					sql += dados.cnpj + "','";
					sql += dados.nome_fantasia + "','";
					sql += dados.razao_social + "','";
					sql += dados.nome_usuario + "',";
					sql += result.insertId + ")";
					connection.query(sql, (err,result) => {
						if (err) {
							connection.rollback(()=>{
								return done(err);
							});
						} else { 
							connection.commit((err) => {

								if (err){
									connection.rollback(()=>{
										return done(err);
									})
								}

								connection.release();
							});

							return done(null, result.insertId)
						}
					});
				}

			});
			
		})
	});
	
}
exports.logout = function(token,done){
	db.get().query('INSERT INTO token_black VALUES (?)',[token], function (err, result) {

		if (err) return done(err);
		else return done(null, result.affectedRows);
	})
}
exports.remover = function(id,done) {
	db.get().query('UPDATE usuario SET status = 0 WHERE id_usuario = ?',[id], function (err, result) {
		if (err) return done(err);
		else return done(null, result.changedRows);
	})
}
exports.login = function(dados, done) {
	getParceiro(dados.nome_usuario, usuario => {
		if(!usuario){
			return done(404);
		}
		if(dados.senha !== usuario.senha){
			return done(401)
		}
		return done(null,createToken(usuario));
	})
}

exports.getAll = function(done) {
	db.get().query('SELECT * FROM parceiro JOIN usuario ON usuario.id_usuario = parceiro.id_usuario', function (err, rows) {
		if (err) return done(err);
		else return done(null, rows);
	})
}

exports.checkToken = function(token,done){
	db.get().query('SELECT * FROM token_black WHERE token = ?', [token], function(err, rows, fields) {
		if (err) return done(err);
		done(null,rows);
	});
}

exports.getUsuario = function(usuario, done) {
	db.get().query('SELECT * FROM usuario JOIN parceiro ON usuario.id_usuario = parceiro.id_usuario WHERE usuario.status = 1 AND usuario.nome = ?', [usuario], function(err, rows, fields) {
		if (err) return done(err);
		done(null,rows[0]);
	});
}
function createToken(usuario) {
	return jwt.sign(_.omit(usuario, 'senha2'), key.secretKey, { expiresIn: 60*60*5 });
}

function getParceiro(usuario, done) {
	db.get().query('SELECT * FROM usuario JOIN parceiro ON usuario.id_usuario = parceiro.id_usuario WHERE usuario.status = 1 AND usuario.nome = ?', [usuario], function(err, rows, fields) {
		if (err) return done(err);
		done(rows[0]);
	});
}