app.service("httpService", ['$http','$sce', function ($http,$sce) {
        this.post = function (url, data,ignoreLoader) {
        	if(ignoreLoader == undefined || ignoreLoader == null || ignoreLoader == ""){
        		ignoreLoader = false;
        	}
        	return $http.post(url, data, {
        		ignoreLoader : ignoreLoader
            });
        };
        this.get = function (url,responseType,ignoreLoader) {
        	if(ignoreLoader == undefined || ignoreLoader == null || ignoreLoader == ""){
        		ignoreLoader = false;
        	}
        	var data = {method: "GET",url: url,ignoreLoader:ignoreLoader};
        	if(responseType == true){
        		data.responseType = 'arraybuffer';
        		return $http(data);        		
        	}else{
        		return $http(data);        		
        	}
        };

        this.delete = function (url) {
            return $http({
                method: "DELETE",
                url: url                
            });
        };
    }]);