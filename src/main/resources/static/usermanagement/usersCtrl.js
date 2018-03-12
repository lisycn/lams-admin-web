app.controller("usersCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification",
	function($scope, $http, $rootScope, Constant, userService, Notification) {

		$scope.forms = {};
		$scope.userData = {};
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
			userService.updateLenderDetails($scope.userData).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.success(success.data.message);
						$scope.userData = {};
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


		//Sending Invitaiton to Lender
		$scope.inviteLender = function(lenderObj) {
			userService.inviteLender(lenderObj).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.success(success.data.message);
						lenderObj = success.data.data;
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