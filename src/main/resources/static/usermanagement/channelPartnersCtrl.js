angular.module("lamsAdmin").controller("channelPartnerCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification","NgTableParams","$filter",
	function($scope, $http, $rootScope, Constant, userService, Notification, NgTableParams, $filter) {

		$scope.forms = {};
		$scope.userData = {};
		$scope.users = [];
		$scope.getUsers = function(userType) {
			//userType is NUll then will fetch all the users
			userService.getUserByType(userType).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.users = success.data.data;
						$scope.userTable.reload();
	                    $scope.userTable.page(1);
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
		$scope.getUsers(Constant.UserType.CHANNEL_PARTNER.id);
		
		$scope.search = {};
		$scope.$watch("search.channelPartner", function () {
            $scope.userTable.reload();
            $scope.userTable.page(1);
        });
		
		$scope.userTable = new NgTableParams({page: 1, count: 500, sorting: {firstName: "asc"}}, {
            counts: [],
            getData: function ($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
                if ($scope.search.channelPartner) {
                    orderedData = $filter('filter')(orderedData, $scope.search.channelPartner);
                }
                if (orderedData) {
                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            }
        });
		
		
	} ]);