/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lamsAdmin",['ui.router','ngMessages','toastr','ngCookies']);
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
	.state("main.lams", {
		url : '/lams',
		abstract: true,
        views: {
            'header@main': {
                templateUrl: 'common/htmls/header.html',
            },
            'footer@main': {
                templateUrl: 'common/htmls/footer.html',
            },
            'sidebar@main': {
                templateUrl: 'common/htmls/sidebar.html',
            }
        }
	}).state("main", {
    	url : '',
    	templateUrl : 'main.html',
	}).state("main.lams.dashboard", {
        	url : '/dashboard',
        	views :  {
        		'content@main' :  {
        			templateUrl : 'dashboard/dashboard.html',
            		controller: 'dashboardCtrl',
            		data : {pageTitle : "Lams Admin | Dashboard"}        			
        		}
        	}
	}).state("main.lams.users", {
    	url : '/users',
    	views :  {
    		'content@main' :  {
    			templateUrl : 'usermanagement/users.html',
        		controller: 'usersCtrl',
        		data : {pageTitle : "Lams Admin | User Management"}        			
    		}
    	}
});
	$urlRouterProvider.otherwise("login");
}]);

app.run([ '$rootScope', '$state', '$stateParams','$http','$timeout',"$interval","$q","userService","Constant","$cookieStore",
	function($rootScope, $state, $stateParams,$http,$timeout,$interval,$q,userService,Constant,$cookieStore) {
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
    $rootScope.isEmpty = function(data) {
		return (data == null || data == undefined || data == ""
				|| data == "null" || data == "undefined"
				|| data == '' || data == [] || data == {});
	}
    
    $rootScope.doLogout = function(){
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
//    $state.go("login");

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