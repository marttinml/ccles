(function(){
	var loginSevice = function($http){
		
		this.login =  function(opts){

			var req = {
				 method: 'POST',
				 url: '/login',
				 headers: {
				   'Content-Type': 'application/json'
				 },
				 data: JSON.stringify(opts.data)
			}
			console.log(opts);
			$http(req).success(opts.done).error(opts.fail);
		};

	};

	loginApp.service('LoginSevice',loginSevice);
})()