/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lamsAdmin", [ "ui.router", 
	"oc.lazyLoad",
	"ngCookies",
	"ngMessages",
	"toastr",
	"ui.bootstrap",
	"angular-loading-bar",
	"ngTable"
	]);

getUrls().then(bootstrapApplication);
function getUrls() {
	var initInjector = angular.injector([ "ng" ]);
	var $http = initInjector.get("$http");
	return $http.get("web/get_urls").then(function(response) {
		app.constant("URLS", response.data);
	}, function(errorResponse) {
		console.log("Something went wrong")
	});
}
function bootstrapApplication() {
	angular.element(document).ready(function() {
		angular.bootstrap(document, [ "lamsAdmin" ]);
	});
}

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 500;
}]);

//app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
//	$ocLazyLoadProvider.config({
//		  debug: true
//		});
//}]);

app.config([ "$stateProvider", "$urlRouterProvider", "$locationProvider", "$sceDelegateProvider",
	function($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider, $controllerProvider) {

	$stateProvider
			.state("login", {
				url : '/login',
				templateUrl : 'common/htmls/login.html',
				controller : 'loginCtrl',
				data : {
					pageTitle : "Admin | Login"
				}
			})
			.state("admin.lams", {
				url : '/lams',
				abstract : true,
				views : {
					'header@admin' : {
						templateUrl : 'common/htmls/header.html',
					},
					'footer@admin' : {
						templateUrl : 'common/htmls/footer.html',
					},
					'sidebar@admin' : {
						templateUrl : 'common/htmls/sidebar.html',
					}
				}
			}).state("admin", {
			url : '/admin',
			templateUrl : 'admin.html',
		}).state("admin.lams.dashboard", {
			url : '/dashboard',
			views : {
				'content@admin' : {
					templateUrl : 'dashboard/dashboard.html',
					controller : 'dashboardCtrl'		
				}
			},
			resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: [
                            'dashboard/dashboardCtrl.js']});
                }]
			},
			data : {
				pageTitle : "Admin | Dashboard"
			}
		}).state("admin.lams.lenders", {
			url : '/lenders',
			views : {
				'content@admin' : {
					templateUrl : 'usermanagement/lenders.html',
					controller : 'lendersCtrl'
				}
			},
			data : {
				pageTitle : "Admin | Lenders"
			},
			resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: [
                            'usermanagement/lendersCtrl.js']});
                }]
			}
		}).state("admin.lams.borrowerProfile", {
	    	url : '/borrwerProfile/:brId',
	    	views :  {
	    		'content@admin' :  {
	    			templateUrl : 'profiles/borrowerProfile.html',
	        		controller: 'borrowerProfileCtrl'
	    		}
	    	},
	    	data : {pageTitle : "Admin | Borrower Profile"},
	    	resolve: {
	            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load({files: [
	                        'profiles/borrowerProfile.js']});
	            }]
	    	}
	   }).state("admin.lams.borrowers", {
			url : '/borrowers',
			views : {
				'content@admin' : {
					templateUrl : 'usermanagement/borrowers.html',
					controller : 'borrowersCtrl'
				}
			},
			data : {
				pageTitle : "Admin | Borrowers"
			},
			resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: [
                            'usermanagement/borrowersCtrl.js']});
                }]
			}
		}).state("admin.lams.channelPartners", {
			url : '/channelPartners',
			views : {
				'content@admin' : {
					templateUrl : 'usermanagement/channelPartners.html',
					controller : 'channelPartnerCtrl'
				}
			},
			data : {
				pageTitle : "Admin | channel Partners"
			},
			resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: [
                            'usermanagement/channelPartnersCtrl.js']});
                }]
			}
		}).state("admin.lams.channelPartnerProfile", {
	    	url : '/channelPartnerProfile/:cpId',
	    	views :  {
	    		'content@admin' :  {
	    			templateUrl : 'profiles/channelPartnerProfile.html',
	        		controller: 'channelPartnerProfileCtrl'
	    		}
	    	},
	    	data : {pageTitle : "Admin | Channel Partner Profile"},
	    	resolve: {
	            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load({files: [
	                        'profiles/channelPartnerProfileCtrl.js']});
	            }]
	    	}
	   });
	
		$urlRouterProvider.otherwise("login");
	} ]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        if ($rootScope.activeCalls == undefined) {
            $rootScope.activeCalls = 0;
        }
//        console.log("$rootScope.activeCalls====>",$rootScope.activeCalls);

        return {
            request: function (config) {
                $rootScope.activeCalls += 1;
                return config;
            },
            requestError: function (rejection) {
                $rootScope.activeCalls -= 1;
                return rejection;
            },
            response: function (response) {
                $rootScope.activeCalls -= 1;
                return response;
            },
            responseError: function (rejection) {
                $rootScope.activeCalls -= 1;
                return rejection;
            }
        };
    });
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