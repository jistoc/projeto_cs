const mysql = require('mysql');
const async = require('async');

const PRODUCTION_DB = 'sql10202259';
const TEST_DB = 'sql10202259';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
	pool: null,
	mode: null,
}

exports.connect = function(mode, done) {
	state.pool = mysql.createPool({
		host: 'sql10.freemysqlhosting.net',
		user: 'sql10202259',
		password: 'Vs7zyeEkND',
		database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
	})

	state.mode = mode
	done();
}

exports.get = function() {
	return state.pool
}

exports.fixtures = function(data) {
	var pool = state.pool
	if (!pool) return done(new Error('Sem conexão.'))

	var names = Object.keys(data.tables)
	async.each(names, function(name, cb) {
		async.each(data.tables[name], function(row, cb) {
			var keys = Object.keys(row)
			, values = keys.map(function(key) { return "'" + row[key] + "'" })

			pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
		}, cb)
	}, done)
}
exports.drop = function(tables, done) {
	var pool = state.pool

	if (!pool) return done(new Error('Sem conexão.'))

	async.each(tables, function(name, cb) {
		pool.query('DELETE FROM ' + name + ' where 1=1', cb)
	}, done)
}