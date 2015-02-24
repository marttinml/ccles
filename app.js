var express = require("express"),
	app		  = express(),
	http	  = require("http"),
	sass    = require('node-sass'),
	server	= http.createServer(app);
  

//config body
  app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
  });
//config sass
 app.use(
     sass.middleware({
         src: __dirname + '/www',
         dest: __dirname + '/www'	    
     })
  );

//config publics
app.use(express.static(__dirname + '/www'));

//config routes 
routes  = require('./routes/ccles')(app);

init = function(req, res){
  res.sendfile(__dirname +'/www/index.html'); 
};
home = function(req, res){
  res.sendfile(__dirname +'/www/home.html');
};

app.get('/', init);
app.get('/index', init);
app.get('/index.html', init);
app.get('/home', home);
app.get('/home.html', home);

var port = process.env.PORT || 3000;

	server.listen(port, function() {
  		  console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
      	console.log(" |     API REST - http://localhost:"+port+"      | ");
      	console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
	});