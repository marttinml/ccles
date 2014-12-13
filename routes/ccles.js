



module.exports = function(app) {

var Client	= require("node-rest-client").Client,
	client = new Client();
	
init = function(req, res){

	app.get('/', function(req, res) {
		res.sendfile(__dirname +'/www/index.html');
	});
	app.get('/', function(req, res) {
		res.sendfile(__dirname +'/www/home.html');
	});
};

	newUser =  function(req, res){
		console.log(req.body);
		console.log('cresting user...');
	  	client.post("https://polar-fortress-3883.herokuapp.com/user",req.body,function(data,response){
			console.log('successful');
			res.send(":)");
		});

	};

	getsesion =  function(req, res){
		
		console.log(req.body);
		console.log('getting sesion...');
	  	client.get("https://polar-fortress-3883.herokuapp.com/getsesion/2491196788",function(data,response){
			console.log(data);
			res.send(JSON.parse(data));
		});

	};


app.get('/', init);
app.post('/getsesion', getsesion);
app.post('/newUser', newUser);

};

