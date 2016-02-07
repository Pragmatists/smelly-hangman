angular.module('tdd.transients')
    .factory('loggingHttpInterceptor', function ($log) {
        return {
            request : function (config) {
                if (config.url.indexOf('.html') < 0) {
                    $log.debug('Executing HTTP request: ', config, JSON.stringify(config.data));
                }
                return config;
            },
            response : function (response) {
                if (response.config.url.indexOf('.html') < 0) {
                    $log.debug('Got HTTP response: ', response, JSON.stringify(response.data));
                }
                return response;
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('loggingHttpInterceptor');
    });
