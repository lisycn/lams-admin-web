app.service("userService", [ "httpService", "URLS", "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {

			this.getUserDetailsById = function(userId) {
				return httpService.get(URLS.user + '/get_user_details_by_id/' + userId);
			};
	
			this.pingRequest = function() {
				return httpService.get(URLS.user + "/ping");
			};

			this.register = function(data) {
				return httpService.post(URLS.user + "/registration", data);
			};
			
			this.inviteLender = function(data) {
				return httpService.post(URLS.user + "/invite_lender", data);
			};
			
			this.updateLenderDetails = function(data) {
				return httpService.post(URLS.user + "/update_lender_details", data);
			};
			
			this.getLoggedInUserDetail = function() {
				return httpService.get(URLS.user + '/get_user_details');
			};
			
			this.getUserDetailById = function(id) {
				return httpService.get(URLS.user + '/get_user_details/' + id);
			};

			this.login = function(data) {
				return httpService.post(URLS.user + "/login", data);
			};
			
			this.getUserByType = function(userType) {
				return httpService.get(URLS.user + "/getUsersByType/" + userType);
			};
			
			this.logout = function() {
				return httpService.get(URLS.user + "/logout");
			};
			
			this.getCpUsers = function(userType,userId) {
				return httpService.get(URLS.user + '/get_cp_users/' + userType + "/" + userId);
			};
			
		} ]);