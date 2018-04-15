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
	
}]);
