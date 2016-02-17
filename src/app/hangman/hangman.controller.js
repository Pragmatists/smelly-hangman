angular
  .module('tdd.hangman')
  .controller('HangmanController', function ($http, $scope, language) {
    var vm = this;

    vm.missesAllowed = 6;

    var words = [];

    language
      .words()
      .then(function (availableWords) {
        words = availableWords;
        vm.reset();
      });

    makeLettersAbc();

    vm.reset = function () {
      _.each($scope.letters, function (letter) {
        letter.chosen = false;
      });

      vm.secretWord = makeLetters(_.sample(words));
      vm.numMisses = 0;
      vm.win = false;
      vm.lost = false;
    };

    $scope.try = function (guess) {
      guess.chosen = true;
      var found = false;
      _.each(vm.secretWord, function (letter) {
        if (guess.name.toUpperCase() == letter.name.toUpperCase()) {
          letter.chosen = true;
          found = true;
        }
      });

      if (found == false) {
        vm.numMisses++;
      }

      checkForEndOfGame();
    };


    function makeLettersAbc() {
      var alphabet = language.alphabet();
      $scope.letters = makeLetters(alphabet);
    }

    function makeLetters(word) {
      return _.map(word, function (letter) {
        return {name: letter, chosen: false};
      });
    }

    function checkForEndOfGame() {

      vm.win = _.reduce(vm.secretWord, function (memo, letter) {
        return memo && letter.chosen;
      }, true);
      if (vm.win === false && vm.numMisses == vm.missesAllowed) {
        vm.lost = true;
        _.each(vm.secretWord, function (letter) {
          letter.chosen = true;
        });
      }
    }

  });
