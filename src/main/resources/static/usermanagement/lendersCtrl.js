angular.module("lamsAdmin").controller("lendersCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification", "NgTableParams", "$filter",
	function($scope, $http, $rootScope, Constant, userService, Notification,NgTableParams, $filter) {

		$scope.forms = {};
		$scope.users = [];
		$scope.resetUser = function(){
			$scope.userData = {bank : {}};
		}
		$scope.getUsers = function(userType) {
			//userType is NUll then will fetch all the users
			userService.getUserByType(userType).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.users = success.data.data;
						$scope.userTable.reload();
	                    $scope.userTable.page(1);						
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
			$scope.showEditMode = true;
			$scope.userData.password = $scope.userData.tempPassword;
			$scope.userData.confirmPassword = $scope.userData.tempPassword;
			if(!$rootScope.isEmpty($scope.userData.applications)){
				$scope.userData.applicationTypeId = $scope.userData.applications[0].applicationTypeId;				
			}
			$("#userEmail").focus();
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
			$scope.userData.applications = [{"applicationTypeId" : $scope.userData.applicationTypeId}];
			console.log("$scope.userData===>",$scope.userData);
			userService.updateLenderDetails($scope.userData).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.success(success.data.message);
						$scope.resetUser();
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
		

		$scope.search = {};
		$scope.$watch("search.lender", function () {
            $scope.userTable.reload();
            $scope.userTable.page(1);
        });
		
		$scope.userTable = new NgTableParams({page: 1, count: 500, sorting: {firstName: "asc"}}, {
            counts: [],
            getData: function ($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
                if ($scope.search.lender) {
                    orderedData = $filter('filter')(orderedData, $scope.search.lender);
                }
                if (orderedData) {
                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            }
        });

		
		

	} ]);