app.service("userService", [ 'httpService', 'URLS', "$rootScope",
		function(httpService, URLS, $rootScope) {

			this.pingRequest = function() {
				return httpService.get(URLS.user + "/ping");
			};

			this.register = function(data) {
				return httpService.post(URLS.user + '/register', data);
			};

			this.login = function(data) {
				return httpService.post(URLS.user + '/login', data);
			};
		} ]);