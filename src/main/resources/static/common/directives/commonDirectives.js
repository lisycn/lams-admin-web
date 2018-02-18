/**
 * 
 */
app.directive('title', ['$rootScope', '$timeout',
	  function($rootScope, $timeout) {
	    return {
	      link: function() {
	        var listener = function(event, toState) {
	          $timeout(function() {
	            $rootScope.globalCommonTitle = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : 'Loan Application Management System.';
	          });
	        };
	        $rootScope.$on('$stateChangeSuccess', listener);
	      }
	    };
	  }
]);