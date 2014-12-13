var express = require("express"),
	app		= express(),
	http	= require("http"),
	server	= http.createServer(app);

app.use(express.static(__dirname + '/www'));

routes = require('./routes/ccles')(app);


	server.listen(2000, function() {
  		console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
      	console.log(" |     API REST - http://localhost:2000      | ");
      	console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
	});