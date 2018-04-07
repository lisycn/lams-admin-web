angular.module("lams").controller("ldProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter) {

	$scope.isDisable = false;
	$scope.initUserObj = function(){
		$scope.userData = { address : {
			country : {},
			state : {},
			city : {}
		}};		
	}
	$scope.initUserObj();
	$scope.updateUserDetail = function(){
		if ($scope.lenderForm.$invalid) {
			$scope.lenderForm.$submitted = true;
			Notification.warning("aestrik(*) marked fieds are mandatory.");
			return false;
		}
		$scope.isDisable = true;
		userService.updateUserDetail($scope.userData).then(
	            function(success) {
	            	$scope.isDisable = false;
	            	if(success.data.status == 200){
	            		Notification.info("Successfully Updated !");
	            		$rootScope.user = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$scope.isDisable = false;
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.getUserDetail = function(){
		userService.getLoggedInUserDetail().then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		$scope.separateName($scope.userData);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.separateName = function(data){
		data.userTypName = $rootScope.getUserByType(data.userType).value;
		if($rootScope.isEmpty(data.firstName) && $rootScope.isEmpty(data.lastName)){
			var names = data.name.split(" ");
    		if(names.length == 1){
    			data.firstName = names[0].trim();	
    		}else if(names.length == 2){
    			data.firstName = names[0].trim();
    			data.lastName = names[1].trim();
    		}else if(names.length == 3){
    			data.firstName = names[0].trim();
    			data.middleName = names[1].trim();
    			data.lastName = names[2].trim();
    		}
		}
		$rootScope.user = data;
	}
	$scope.getUserDetail();
}]);
