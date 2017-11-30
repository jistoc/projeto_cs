var db = require('../config/db.js')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const key  = require('./../config/key.json');
exports.alterar = function(dados,done) {
	if(!dados.data_pagamento || dados.data_pagamento==undefined)
		dados.data_pagamento = ' ';
	let sql = "UPDATE titulo SET ";
	sql += "valor = '"+ dados.valor + "',"
	sql += "situacao = " +  dados.situacao +",";
	sql += "descricao =  '" + dados.descricao+ "',"
	sql += "data_emissao = '" + dados.data_emissao + "',";
	sql += "data_pagamento = '" + dados.data_pagamento + "'";
	sql += "WHERE id_titulo = " + dados.id_titulo;  
	
	db.get().query(sql,[dados.cpf,dados.nome_cliente, dados.id_cliente],  (err,result) =>{
		if (err){
			return done(err);
		} else {
			return done(null, result.affectedRows);
		}

	});
}

exports.create = function(dados, done) {
	if(!dados.data_pagamento || dados.data_pagamento==undefined)
		dados.data_pagamento = ' ';
	let keys = Object.keys(dados);
	let values = keys.map(function(key) { return "'" + dados[key] + "'" })

	let sql = "INSERT INTO titulo (id_parceiro, id_cliente, valor, situacao, descricao, data_emissao, data_pagamento ) VALUES (" ;
	sql += dados.id_parceiro + ",";
	sql += dados.id_cliente + ",'";
	sql += dados.valor + "',";
	sql += dados.situacao + ",'";
	sql += dados.descricao + "','";
	sql += dados.data_emissao + "','";
	sql += dados.data_pagamento + "')";


	console.log(sql);

	db.get().query(sql, (err,result) =>{
		if (err){
			console.log(err);
			return done(err);
		} else {
			return done(null, result.insertId);
		}

	});
		
	
}
exports.remover = function(id,done) {
	db.get().query('delete from titulo WHERE id_titulo = ?',[id], function (err, result) {
		if (err) return done(err);
		else return done(null, 1);
	})
}

exports.getAll = function(id,done) {
	console.log(id)
	var  sql = 'SELECT * FROM titulo where id_parceiro = ' + id;
	console.log(sql)
	db.get().query( sql, function (err, rows) {
		if (err) return done(err);
		else return done(null, rows);
	})
}


exports.getTitulo = function(cliente, done) {
	db.get().query('SELECT * FROM titulo WHERE id_titulo = ?', [cliente], function(err, rows, fields) {
		if (err) return done(err);
		done(null,rows[0]);
	});
}

