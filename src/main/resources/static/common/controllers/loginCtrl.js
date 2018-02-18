app.controller("loginCtrl",["$scope", "$http","$rootScope","userService","Constant","$state",
		function($scope,$http,$rootScope,userService,Constant,$state) {
	$scope.login = {};
	$scope.msg = null;
	$scope.doLogin = function(){
		$state.go("lams.users");
		if($scope.loginForm.$invalid){
			$scope.loginForm.$submitted = true;
			console.warn("Invalid Form Details");
			return false;
		}
		userService.login($scope.login).then(
	            function(success) {
	            	if(success.data.status == 200 && !$rootScope.isEmpty(success.data.data)){
	                }else if(success.data.status == 400){
	                	msg = success.data.message;
	                }else{
	                	msg = Constant.ErrorMessage.SOMETHING_WENT_WRONG;
	                }
	            }, function(error) {
	                if(error.status == 401){
	                    $rootScope.logout();
	                }
	                else{
	                	msg = Constant.ErrorMessage.SOMETHING_WENT_WRONG;
	                }
	     });		
		
	}
}]);
