const EstrategiaAutenticacao = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Parceiro = require('../models/parceiro');
const key = require('../config/key.json');

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = key.secretKey;
	passport.use(new EstrategiaAutenticacao(opts, (jwt_payload, done) => {

    Parceiro.getUsuario(jwt_payload.nome, (err,usuario) => {
      if(err){
        return done(err, false, { message : 'Nao autorizado'});
      }
      if(usuario){
        return done(null, usuario, { message : 'Autorizado'});
      } else {
        return done(null, false, { message : 'Nao autorizado'});
      }
    });
  }));
}
