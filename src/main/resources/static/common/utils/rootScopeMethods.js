app.run([ "$rootScope", "$state", "$stateParams", "$http", "$timeout", "$interval", "$q", "userService", "Constant", "$cookieStore", "Notification", "masterService",
	function($rootScope, $state, $stateParams, $http, $timeout, $interval, $q, userService, Constant, $cookieStore, Notification, masterService) {
		$rootScope.state = $state;
		$rootScope.stateParams = $stateParams;
		$rootScope.Constant = Constant;
		$rootScope.isEmpty = function(data) {
			return (data == null || data == undefined || data == ""
				|| data == "null" || data == "undefined"
				|| data == '' || data == [] || data == {});
		}

		$rootScope.doLogout = function() {
			if ($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))) {
				$state.go("login");
				return;
			}
			userService.logout().then(
				function(success) {
					$cookieStore.remove(Constant.TOKEN);
					$state.go("login");
				}, function(error) {
					$cookieStore.remove(Constant.TOKEN);
					$state.go("login");
				});

		}
		if ($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))) {
			$rootScope.doLogout();
		}
		$rootScope.validateErrorResponse = function(error) {
			if (error.status == 401) {
				Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
				$rootScope.doLogout();
			} else if (error.status == 500) {
				if (!$rootScope.isEmpty(error.data)) {
					var errorRes = error.data.message.split(" ")[0];
					if (errorRes == 401) {
						Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
						$rootScope.doLogout();
					}
				} else {
					Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
				}
			} else if (error.status == 400) {
				Notification.error(Constant.ErrorMessage.BAD_REQUEST);
			} else {
				Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
			}
		}


		$rootScope.getUserByType = function(userType) {
			switch (userType) {
			case Constant.UserType.LENDER.id:
				return Constant.UserType.LENDER;
			case Constant.UserType.BORROWER.id:
				return Constant.UserType.BORROWER;
			case Constant.UserType.ALL.id:
				return Constant.UserType.ALL;
			default:
				return null;
			}
		}

		$rootScope.user = {};
		$rootScope.getLoggedInUserDetail = function() {
			userService.getLoggedInUserDetail().then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.user = success.data.data;
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.countries = [];
		$rootScope.getCountries = function(mode) {
			masterService.countries(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.countries = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.salutations = [];
		$rootScope.getSalutations = function(mode) {
			masterService.salutations(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.salutations = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.banks = [];
		$rootScope.getBanks = function(mode) {
			masterService.banks(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.banks = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		
		$rootScope.applicationTypes = [];
		$rootScope.getApplicationTypes = function(mode) {
			masterService.applicationType(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.applicationTypes = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$rootScope.loadMasters = function() {
			$rootScope.getCountries(Constant.Mode.ACTIVE.id);
			$rootScope.getLoggedInUserDetail();
			$rootScope.getSalutations(Constant.Mode.ACTIVE.id);
			$rootScope.getBanks(Constant.Mode.ACTIVE.id);
			$rootScope.getApplicationTypes(Constant.Mode.ACTIVE.id);
		}

		//Getting All Masters
		if (!$rootScope.isEmpty($cookieStore.get(Constant.TOKEN))) {
			$rootScope.loadMasters();
		}
		$rootScope.genders = [ {
			id : 1,
			value : 'Male'
		}, {
			id : 2,
			value : 'Female'
		}, {
			id : 3,
			value : 'Third Gender'
		} ];

	} ]);