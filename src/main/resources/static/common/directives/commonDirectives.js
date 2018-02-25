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

app.directive('isActive', function () {
    return {
        restrict: 'E',
        scope: {
            status: '@' 
        },
        template: '<span class="label label-default" ng-class="{true: \'label-info\' , false:\'label-danger\' }[status]"> {{ status | isActive }}</span>'
    }
})
