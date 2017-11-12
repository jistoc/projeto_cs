const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const parceiro = require('./routes/parceiro');
const login = require('./routes/login');
const validator = require('express-validator');
const db = require('./config/db');
const api_url = '/api/v1/';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const key  = require('./config/key.json');
const passport = require('passport');

app.use(cors());	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.static(path.join(__dirname,'public')));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use(api_url + 'parceiro', parceiro);
app.use(api_url, login);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});

db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Falha ao conectar ao banco.')
    process.exit(1)
  } else {
    app.listen(port, () => {
		console.log("Iniciado na porta "+port);

		// db.drop(['parceiro'], (err,result) =>{
		// 	console.log(err);
		// 	console.log(result);
		// })
		
	});

  }
})

