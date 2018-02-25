app.filter('isActive',  function () {

        return function (status) {

            switch (status) {
                case 'true':
                    return "Active";
                    break;
                case 'false':
                    return "InActive";
                    break;
                default :
                    return "Unknown";
            }
        };
    });