
const passport = require('passport');
const jwt = require('jsonwebtoken');
exports.jwtCheck = function (req, res, next){
    passport.authenticate('jwt', { session: false }, function(err, user, info) { 
        if (err) { return next(err); } 
        if (!user) { return res.status(401).json({mensagem:"Nao autorizado!"}).end(); } 
        
        req.user = user;
        next();
    })(req, res, next);
}