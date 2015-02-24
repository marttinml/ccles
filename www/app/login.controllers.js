(function(){

	var loginController = function($scope,$loginService){
		
		$scope.data = {
			user:'',
			pass:''
		}

		$scope.ph = {
			number:'55 0000 0000',
			password: '••••••••••'
		};

		$scope.send = function(){
			console.log('Ssss');
			var opts ={
				data:$scope.data,
				done:function(data){

				},
				fail:function(data){

				}
			};

			$loginService.login(opts);
		
		};

	};

	loginController.$inject = ['$scope','LoginSevice'];
	loginApp.controller('LoginController',loginController);

})()