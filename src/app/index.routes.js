(function () {
  'use strict';

  angular
    .module('tdd')
    .config(function routerConfig($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('login',{
          url: '/login',
          templateUrl: 'app/login.html',
          controllerAs: 'login',
          controller: 'loginController'
      })
      .state('hangman',{
          url: '/hangman',
        templateUrl: 'app/hangman/hangman.html'
      });

      $urlRouterProvider.otherwise('/login');

    });

})();
