/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lamsAdmin",["ui.router","ngCookies","ngMessages","toastr","ui.bootstrap"]);
getUrls().then(bootstrapApplication);
function getUrls() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    return $http.get("web/get_urls").then(function(response) {
        app.constant("URLS", response.data);
    }, function(errorResponse) {
        console.log("Something went wrong")
    });
}
function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["lamsAdmin"]);
    });
}
app.config(["$stateProvider", "$urlRouterProvider" ,"$locationProvider","$sceDelegateProvider",
	function($stateProvider, $urlRouterProvider,$locationProvider,$sceDelegateProvider){
	$stateProvider
	.state("login", {
		url : '/login',
		templateUrl : 'common/htmls/login.html',
		controller: 'loginCtrl',
		data : {pageTitle : "Lams Admin | Login"}
	})
	.state("admin.lams", {
		url : '/lams',
		abstract: true,
        views: {
            'header@admin': {
                templateUrl: 'common/htmls/header.html',
            },
            'footer@admin': {
                templateUrl: 'common/htmls/footer.html',
            },
            'sidebar@admin': {
                templateUrl: 'common/htmls/sidebar.html',
            }
        }
	}).state("admin", {
    	url : '/admin',
    	templateUrl : 'admin.html',
	}).state("admin.lams.dashboard", {
        	url : '/dashboard',
        	views :  {
        		'content@admin' :  {
        			templateUrl : 'dashboard/dashboard.html',
            		controller: 'dashboardCtrl',
            		data : {pageTitle : "Lams Admin | Dashboard"}        			
        		}
        	}
	}).state("admin.lams.users", {
    	url : '/users',
    	views :  {
    		'content@admin' :  {
    			templateUrl : 'usermanagement/users.html',
        		controller: 'usersCtrl'
    		}
    	},
    	data : {pageTitle : "Lams Admin | User Management"}
});
	$urlRouterProvider.otherwise("login");
}]);

app.run([ "$rootScope", "$state", "$stateParams","$http","$timeout","$interval","$q","userService","Constant","$cookieStore","Notification","masterService",
	function($rootScope, $state, $stateParams,$http,$timeout,$interval,$q,userService,Constant,$cookieStore,Notification,masterService) {
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
    $rootScope.Constant = Constant;
    $rootScope.isEmpty = function(data) {
		return (data == null || data == undefined || data == ""
				|| data == "null" || data == "undefined"
				|| data == '' || data == [] || data == {});
	}
    
    $rootScope.doLogout = function(){
    	if($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))){
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
    if($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))){
    	$rootScope.doLogout();
    }
    $rootScope.validateErrorResponse = function(error){
    	if(error.status == 401){
        	Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
            $rootScope.doLogout();
        }else if(error.status == 500){
        	if(!$rootScope.isEmpty(error.data)){
        		var errorRes = error.data.message.split(" ")[0];
        		if(errorRes == 401){
        			Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
        			$rootScope.doLogout();
        		}
        	}else{
        		Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);	
        	}
        } else if(error.status == 400){
        	Notification.error(Constant.ErrorMessage.BAD_REQUEST);
        }else{
        	Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
        }
    }
    
    
    $rootScope.getUserByType = function(userType){
		switch(userType){
		case  Constant.UserType.LENDER.id:
			return Constant.UserType.LENDER;
		case Constant.UserType.BORROWER.id:
			return Constant.UserType.BORROWER;
		case Constant.UserType.ALL.id:
			return Constant.UserType.ALL;
		default : 
			return null;
		}
	}
    
    $rootScope.user = {};
	$rootScope.getLoggedInUserDetail = function(){
		userService.getLoggedInUserDetail().then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$rootScope.user = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
    
    $rootScope.countries = [];
	$rootScope.getCountries = function(mode){
		masterService.countries(mode).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$rootScope.countries = success.data.data;	            		
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
    $rootScope.salutations = [];
	$rootScope.getSalutations = function(mode){
		masterService.salutations(mode).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$rootScope.salutations = success.data.data;	            		
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$rootScope.loadMasters = function(){
		$rootScope.getCountries(Constant.Mode.ACTIVE.id);
		$rootScope.getLoggedInUserDetail();
		$rootScope.getSalutations(Constant.Mode.ACTIVE.id);
}
	
	//Getting All Masters
		if(!$rootScope.isEmpty($cookieStore.get(Constant.TOKEN))){
			$rootScope.loadMasters();	
		}
		
		$rootScope.genders =[{id : 1, value : 'Male'},{id : 2, value : 'Female'},{id : 3, value : 'Third Gender'}];

}]);

//app.config(['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider',
//	function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {
//
//		app.controller = $controllerProvider.register;
//		app.directive = $compileProvider.directive;
//		app.filter = $filterProvider.register;
//		app.factory = $provide.factory;
//		app.service = $provide.service;
//		app.constant = $provide.constant;
//		app.value = $provide.value;
//		
//	}]);