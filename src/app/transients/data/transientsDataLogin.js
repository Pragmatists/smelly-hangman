angular.module('tdd.transients')
    .factory('loginData', function () {
        return {
            status: 'success',
            userId: 123,
            userName: 'Frank',
            userSurname: 'Barber'
        };

    });
