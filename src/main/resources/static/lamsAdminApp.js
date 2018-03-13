/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lamsAdmin", [ "ui.router", "ngCookies", "ngMessages", "toastr", "ui.bootstrap" ]);
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
app.config([ "$stateProvider", "$urlRouterProvider", "$locationProvider", "$sceDelegateProvider",
	function($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider) {
		$stateProvider
			.state("login", {
				url : '/login',
				templateUrl : 'common/htmls/login.html',
				controller : 'loginCtrl',
				data : {
					pageTitle : "Lams Admin | Login"
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
					controller : 'dashboardCtrl',
					data : {
						pageTitle : "Lams Admin | Dashboard"
					}
				}
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
				pageTitle : "Lams Admin | Lenders"
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
				pageTitle : "Lams Admin | Borrowers"
			}
		});
		$urlRouterProvider.otherwise("login");
	} ]);

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