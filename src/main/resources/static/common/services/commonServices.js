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
