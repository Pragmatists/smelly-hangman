angular.module('tdd.transients')
    .config(httpBackendMock)
    .config(delayResponses)
    .run(login)
    .run(hangman)
    .run(passThroughAllOthers);

function httpBackendMock($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
}

function delayResponses($provide) {
    /* eslint-disable */
    $provide.decorator('$httpBackend', function ($delegate) {
        var proxy = function (method, url, data, callback, headers) {
            var interceptor = function () {
                var that = this,
                    args = arguments;
                setTimeout(function () {
                    callback.apply(that, args);
                }, _.random(100, 500));
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        for (var key in $delegate) {
            proxy[key] = $delegate[key];
        }
        return proxy;
    });
    /* eslint-enable */
}

function login($httpBackend, loginData) {
    $httpBackend.whenPOST('/login', {user: 'Frank', password: 'Barber'}).respond(200, loginData);
    $httpBackend.whenPOST('/login').respond(500, {errorMsg: 'wrong password/login'});
}

function hangman($httpBackend, hangmanData) {
    $httpBackend.whenGET('/hangman/words').respond(200, hangmanData);
}

function passThroughAllOthers($httpBackend) {
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
}
