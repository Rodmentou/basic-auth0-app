var express = require('express'),
	app = express(),
	jwt = require('express-jwt'),
	CONFIG = require('./CONFIG.JS');

var jwtCheck = jwt({
  secret: new Buffer(CONFIG.CLIENT_SECRET, 'base64'),
  audience: CONFIG.CLIENT_ID
});


process.env.NODE_ENV = 'prod';

app.get('/', function (req, res) {
	res.json({success: true, message: 'Index page.'});
});

app.use('/api', jwtCheck);

app.get('/api/pow', function (req, res) {
	res.json({success: true, message: "POOOOOOW! YOU'VE MADE IT!!!"});
});


app.listen(8080, function () {
	console.log('Server running!');
});