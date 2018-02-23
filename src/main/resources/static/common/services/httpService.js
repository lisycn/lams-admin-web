app.service("httpService", ['$http','$sce','$cookieStore','Constant','$rootScope', function ($http,$sce,$cookieStore,Constant,$rootScope) {
		this.post = function (url, data,ignoreLoader) {
        	if(ignoreLoader == undefined || ignoreLoader == null || ignoreLoader == ""){
        		ignoreLoader = false;
        	}
        	return $http.post(url, data, {
        		ignoreLoader : ignoreLoader,
    			headers:{
    				token : $cookieStore.get(Constant.TOKEN)
    			}
            });
        };
        this.get = function (url,responseType,ignoreLoader) {
        	if(ignoreLoader == undefined || ignoreLoader == null || ignoreLoader == ""){
        		ignoreLoader = false;
        	}
        	var data = {method: "GET",url: url,ignoreLoader:ignoreLoader,
        			headers:{
        					token : $cookieStore.get(Constant.TOKEN)
        				}
        	};
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
                url: url,
    			headers:{
    				token : $cookieStore.get(Constant.TOKEN)
    			}                
            });
        };
    }]);