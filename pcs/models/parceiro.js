var db = require('../config/db.js')

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

exports.getAll = function(done) {
	db.get().query('SELECT * FROM parceiro JOIN usuario ON usuario.id_usuario = parceiro.id_usuario', function (err, rows) {
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