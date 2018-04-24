angular.module("lamsAdmin").controller("channelPartnerProfileCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification","$stateParams","$filter", 
	function($scope, $http, $rootScope, Constant, userService, Notification, $stateParams, $filter) {

	
	var cpId = $stateParams.cpId;
		userService.getUserDetailsById(cpId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
		
		$scope.getClient = function(userType,userId){
			userService.getCpUsers(userType,userId).then(
		            function(success) {
		            	console.log("success.data==============>",success.data);
		            	if(success.data.status == 200){
		            		$scope.borrowers = success.data.data; 
		                }else{
		                	Notification.warning(success.data.message);
		                }
		            }, function(error) {
		            	$rootScope.validateErrorResponse(error);
		     });	
		}
		$scope.getClient(Constant.UserType.ALL.id,cpId);
	
}]);
