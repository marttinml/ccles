var express = require("express"),
	app		= express(),
	http	= require("http"),
	server	= http.createServer(app);

app.use(express.static(__dirname + '/www'));

routes = require('./routes/ccles')(app);

var port = process.env.PORT || 5000;

	server.listen(port, function() {
  		console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
      	console.log(" |     API REST - http://localhost:2000      | ");
      	console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
	});