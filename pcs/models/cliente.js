var db = require('../config/db.js')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const key  = require('./../config/key.json');

exports.alterar = function(dados,done) {
	let sql = "UPDATE cliente SET cpf = ?, nome_cliente = ? WHERE id_cliente = ?";
	var count = 0;
	db.get().query(sql,[dados.cpf,dados.nome_cliente, dados.id_cliente],  (err,result) =>{
		if (err){
			return done(err);
		} else {
			return done(null, ++count);
		}

	});
}

exports.create = function(dados, done) {
	
	let keys = Object.keys(dados);
	let values = keys.map(function(key) { return "'" + dados[key] + "'" })

	let sql = "INSERT INTO cliente (nome_cliente,cpf) VALUES ('" ;
	sql += dados.nome_cliente + "','";
	sql += dados.cpf+ "')";



	db.get().query(sql, (err,result) =>{
		if (err){
			return done(err);
		} else {
			return done(null, result.insertId);
		}

	});
		
	
}
exports.remover = function(id,done) {
	db.get().query('delete from cliente WHERE id_cliente = ?',[id], function (err, result) {
		if (err) return done(err);
		else return done(null, 1);
	})
}

exports.getAll = function(done) {
	db.get().query('SELECT * FROM cliente', function (err, rows) {
		if (err) return done(err);
		else return done(null, rows);
	})
}


exports.getCliente = function(cliente, done) {
	db.get().query('SELECT * FROM cliente WHERE id_cliente = ?', [cliente], function(err, rows, fields) {
		if (err) return done(err);
		done(null,rows[0]);
	});
}

function getParceiro(cliente, done) {
	db.get().query('SELECT * FROM cliente AND nome = ?', [cliente], function(err, rows, fields) {
		if (err) return done(err);
		done(rows[0]);
	});
}