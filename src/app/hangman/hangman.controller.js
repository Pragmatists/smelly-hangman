angular
  .module('tdd.hangman')
  .controller('HangmanController', function ($http, $scope, language) {
    var vm = this;

    $scope.missesAllowed = 6;

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

      $scope.secretWord = makeLetters(_.sample(words));
      $scope.numMisses = 0;
      $scope.win = false;
      $scope.lost = false;
    };

    $scope.try = function (guess) {
      guess.chosen = true;
      var found = false;
      _.each($scope.secretWord, function (letter) {
        if (guess.name.toUpperCase() == letter.name.toUpperCase()) {
          letter.chosen = true;
          found = true;
        }
      });

      if (found == false) {
        $scope.numMisses++;
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

      $scope.win = _.reduce($scope.secretWord, function (memo, letter) {
        return memo && letter.chosen;
      }, true);
      if ($scope.win === false && $scope.numMisses == $scope.missesAllowed) {
        $scope.lost = true;
        _.each($scope.secretWord, function (letter) {
          letter.chosen = true;
        });
      }
    }

  });
