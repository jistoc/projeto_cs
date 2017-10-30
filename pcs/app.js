const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const parceiro = require('./routes/parceiro');
const validator = require('express-validator');
const db = require('./config/db');
const api_url = '/api/v1/';

app.use(cors());	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname,'public')));


app.use(api_url + 'parceiro', parceiro);

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

