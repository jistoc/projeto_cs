var db = require('../config/db.js')

exports.create = function(dados, done) {
	
	let keys = Object.keys(dados);
	let values = keys.map(function(key) { return "'" + dados[key] + "'" })
	let sql = 'INSERT INTO parceiro' + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')';
	db.get().query(sql, (err,result) =>{
		if (err) 
			return done(err);
		else
			return done(null, result.insertId)
	});
}

exports.getAll = function(done) {
	db.get().query('SELECT * FROM parceiro', function (err, rows) {
		if (err) return done(err);
		else return done(null, rows);
	})
}

exports.getAllByUser = function(id, done) {
	db.get().query('SELECT * FROM parceiro WHERE id = ?', userId, function (err, rows) {
		if (err) return done(err)
		done(null, rows)
	})
}