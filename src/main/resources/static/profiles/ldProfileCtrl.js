angular.module("lamsAdmin").controller("ldProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter","$stateParams","applicationService",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter,$stateParams,applicationService) {

	var ldId = $stateParams.ldId;
	$scope.isDisable = false;
	$scope.userData = {};
	$scope.connections = [];
	
	
	$scope.getConnections = function(id) {
		applicationService.getConnectionByLenderId(id).then(
			function(success) {
				if (success.data.status == 200) {
					console.log(success.data.data);
					$scope.connections = success.data.data;
				} else {
					Notification.error(success.data.message);
				}
			}, function(error) {
				$rootScope.validateErrorResponse(error);
			});
	};
	$scope.getConnections(ldId);
	
	$scope.getUserDetail = function(id){
		userService.getUserDetailById(id).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		console.log("$scope.userData==>",$scope.userData);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	$scope.getUserDetail(ldId);
}]);
