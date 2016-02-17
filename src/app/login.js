angular
  .module('tdd')
  .controller('loginController', function ($http, $state) {

    var vm = this;

    this.loginIn = function (user, password) {
      console.log(user, password);
      $http.post('/login', {user: user, password: password}).then(function (result) {
        localStorage.setItem("userName", result.data.userName + ' ' + result.data.userSurname);
        localStorage.setItem("userId", result.data.userId);
        $state.go('hangman');
      }, function (result) {
        vm.error = "You did not log in";
      });
    }
  });
