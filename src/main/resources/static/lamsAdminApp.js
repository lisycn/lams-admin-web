/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lamsAdmin",['ui.router','ngMessages','ngCookies']);
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
		data : {pageTitle : "Lams | Admin Login"}
	})
	.state("lams", {
		url : '/lams',
		abstract: true,
        views: {
            'header': {
                templateUrl: 'common/htmls/header.html',
            },
            'footer': {
                templateUrl: 'common/htmls/footer.html',
            },
            'sidebar': {
                templateUrl: 'common/htmls/sidebar.html',
            }
        }
	}).state("lams.dashboard", {
        	url : '/dashboard',
    		templateUrl : 'dashboard/dashboard.html',
    		controller: 'dashboardCtrl',
    		data : {pageTitle : "Lams | Admin Dashboard"}
	}).state("lams.users", {
    	url : '/users',
		templateUrl : 'users/user-mgnt.html',
		controller: 'userMgntCtrl',
		data : {pageTitle : "Lams | Admin Dashboard"}
	});
	$urlRouterProvider.otherwise("login");
}]);

app.run([ '$rootScope', '$state', '$stateParams','$http','$timeout',"$interval","$cookieStore","$q",
	function($rootScope, $state, $stateParams,$http,$timeout,$interval,$cookieStore,$q) {
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
    $rootScope.isEmpty = function(data) {
		return (data == null || data == undefined || data == ""
				|| data == "null" || data == "undefined"
				|| data == '' || data == [] || data == {});
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