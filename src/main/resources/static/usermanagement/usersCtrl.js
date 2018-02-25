app.controller("usersCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification",
		function($scope, $http,$rootScope,Constant,userService,Notification) {
	
	$scope.users = [];
	$scope.getUsers = function(userType){
		//userType is NUll then will fetch all the users
		userService.getUserByType(userType).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.users = success.data.data;
	            		console.log("$scope.users==>",$scope.users);
	                }else if(success.data.status == 400){
	                	Notification.error(success.data.message);
	                }else{
	                	Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
	                }
	            }, function(error) {
	            	console.log("error==>>",error);
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	$scope.getUsers(Constant.UserType.ALL.id);
}]);
