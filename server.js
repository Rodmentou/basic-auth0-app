var express = require('express'),
	app = express(),
	jwt = require('express-jwt'),
	CONFIG = require('./CONFIG.JS');

var jwtCheck = jwt({
  secret: new Buffer(CONFIG.CLIENT_SECRET, 'base64'),
  audience: CONFIG.CLIENT_ID
});

app.use(express.static(__dirname + '/public'));



app.use('/api', jwtCheck);

app.get('/api/pow', function (req, res) {
	res.json({success: true, message: "POOOOOOW! YOU'VE MADE IT!!!"});
});


app.listen(3001, function () {
	console.log('Server running!');
});