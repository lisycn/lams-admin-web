angular.module("lamsAdmin").controller("borrowerProfileCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification","$stateParams","$filter", 
	function($scope, $http, $rootScope, Constant, userService, Notification, $stateParams, $filter) {

	
	var brId = $stateParams.brId;
		userService.getUserDetailsById(brId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		$scope.existingAppCount = $filter('filter')($scope.userData.applications,{loanTypeId : Constant.LoanType.EXISTING_LOAN}).length;
						$scope.curentAppCount = $filter('filter')($scope.userData.applications,{loanTypeId : Constant.LoanType.CURRENT_LOAN}).length;
						$scope.closedAppCount = $filter('filter')($scope.userData.applications,{loanTypeId : Constant.LoanType.CLOSED_LOAN}).length;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });
		
		
	
}]);
