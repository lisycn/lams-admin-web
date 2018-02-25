app.service("userService", [ "httpService", "URLS", "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {

			this.pingRequest = function() {
				return httpService.get(URLS.user + "/ping");
			};

			this.register = function(data) {
				return httpService.post(URLS.user + "/registration", data);
			};
			
			this.updateLenderDetails = function(data) {
				return httpService.post(URLS.user + "/update_lender_details", data);
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
			
		} ]);