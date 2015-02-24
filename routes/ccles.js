module.exports = function(app) {

var Client	= require("node-rest-client").Client,
	client = new Client();
	

/*
	app.get('/home.html', function(req, res) {
		res.sendfile(__dirname +'/www/home.html');
	});*/

	newUser =  function(req, res){
		console.log(req.body);
		console.log('cresting user...');
		client.post("http://localhost:5000/adduser",req.body,function(data,response){
	  	//client.post("https://polar-fortress-3883.herokuapp.com/user",req.body,function(data,response){
			console.log('successful');
			res.send(":)");
		});

	};

	getsesion =  function(req, res){
		
		console.log(req.body);
		console.log('getting sesion...');
	  	client.get("http://localhost:5000/getsesion/2491196788",function(data,response){
	  	//client.get("https://polar-fortress-3883.herokuapp.com/getsesion/2491196788",function(data,response){
			console.log(data);
			res.send(JSON.parse(data));
		});
	};

	login = function(req, res){
		console.log(req.body);
		
		var args = {
		  data: req.body,
		  headers:{"Content-Type": "application/json"} 
		};

		client.post("http://localhost:5000/login",args,function(data,response){
	  	//client.get("https://polar-fortress-3883.herokuapp.com/getsesion/2491196788",function(data,response){
			console.log(data);
			//res.send(data);
			console.log(__dirname +'../www/home.html');
			res.sendfile('/Users/marttin/node/ccles/www/home.html');
		});
	};

app.post('/getsesion', getsesion);
app.post('/newUser', newUser);
app.post('/login',login);

};

