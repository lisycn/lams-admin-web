app.controller("lendersCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification",
	function($scope, $http, $rootScope, Constant, userService, Notification) {

		$scope.forms = {};
		$scope.userData = {bank : {},applications: [{}] };
		$scope.users = [];
		$scope.getUsers = function(userType) {
			//userType is NUll then will fetch all the users
			userService.getUserByType(userType).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.users = success.data.data;
						console.log("$scope.users==>", $scope.users);
					} else if (success.data.status == 400) {
						Notification.error(success.data.message);
					} else {
						Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
					}
				}, function(error) {
					console.log("error==>>", error);
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getUsers(Constant.UserType.LENDER.id);


		$scope.editUserData = function(user) {
			$scope.userData = angular.copy(user);
		}

		$scope.updateLenderDetails = function() {
			if (!$scope.forms.lenderForm.$valid) {
				$scope.forms.lenderForm.$submitted = true;
				Notification.warning("Please fill all mandatory data");
				return false;
			}
			if ($scope.userData.password.trim() != $scope.userData.confirmPassword.trim()) {
				Notification.warning("Password and confirm passwod not matched!!");
				return false;
			}
			$scope.userData.password = $scope.userData.password.trim();
			$scope.userData.tempPassword = $scope.userData.password;
			$scope.userData.userType = Constant.UserType.LENDER.id;
			console.log("$scope.userData===>",$scope.userData);
			userService.updateLenderDetails($scope.userData).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.success(success.data.message);
						$scope.userData = {bank : {},applications: [{}] };
						$scope.getUsers(Constant.UserType.LENDER.id);
					} else if (success.data.status == 400) {
						Notification.warning(success.data.message);
					} else {
						Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
					}
				}, function(error) {
					console.log("error==>>", error);
					$rootScope.validateErrorResponse(error);
				});
		}


		//Sending Invitation to Lender
		$scope.inviteLender = function(lenderObj,$index) {
			userService.inviteLender(lenderObj).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.success(success.data.message);
						lenderObj = success.data.data;
						$scope.users[$index] = lenderObj; 
					} else if (success.data.status == 400) {
						Notification.warning(success.data.message);
					} else {
						Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
					}
				}, function(error) {
					console.log("error==>>", error);
					$rootScope.validateErrorResponse(error);
				});
		}

	} ]);