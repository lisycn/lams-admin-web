app.factory('Notification', ["toastr", function (toastr) {

        var notification = {};

        notification.info = function (message) {
            
                toastr.info(message, 'Information', {
                    closeButton: true,
                    timeOut: 5000
                });
            
        };

        notification.confirm = function (message) {
            
                toastr.info('<button type="button" class="btn btn-primary">Yes</button><button type="button" class="btn btn-danger">No</button>', message, {allowHtml: true, timeOut: 0});
            
        };

        notification.warning = function (message) {
            
                toastr.warning(message, 'Warning', {
                    closeButton: true,
                    timeOut: 5000
                });
            
        };

        notification.error = function (message) {
            
                toastr.error(message, 'Error', {
                    closeButton: true,
                    timeOut: 5000
                });
            
        };

        notification.success = function (message) {
            
                toastr.success(message, {
                    closeButton: true,
                    timeOut: 5000
                });
            
        };
        
        return notification;
    }]);


app.service("masterService", [ 'httpService','URLS',"$http",
	function(httpService, URLS, $http) {

		this.pingRequest = function() {
			return httpService.get(URLS.user + "/ping");
		};

		this.countries = function(mode) {
			return httpService.get(URLS.user + '/master/get_country/'  + mode);
		};
		
		this.salutations = function(mode) {
			return httpService.get(URLS.user + '/master/get_salutation/'  + mode);
		};
		
		this.states = function(countryId) {
			return httpService.get(URLS.user + '/master/get_state_by_country_id/' + countryId);
		};
		
		this.cities = function(stateId) {
			return httpService.get(URLS.user + '/master/get_city_by_state_id/' + stateId);
		};
		
		this.banks = function(mode) {
			return httpService.get(URLS.user + '/master/get_banks/' + mode);
		};
		
		this.applicationType = function(mode) {
			return httpService.get(URLS.user + '/master/get_application_type/' + mode);
		};
		
		
		
	} ]);