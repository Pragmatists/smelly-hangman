angular
  .module('tdd.hangman')
  .controller('HangmanController', function ($http, $scope, language) {

    $scope.missesAllowed = 6;

    var words = [];

    language
      .words()
      .then(function (availableWords) {
        words = availableWords;
        $scope.reset();
      });

    var makeLetters = function (word) {
      return _.map(word.split(''), function (letter) {
        return {name: letter, chosen: false};
      });
    };

    var checkForEndOfGame = function () {
      $scope.win = _.reduce($scope.secretWord, function (memo, letter) {
        return memo && letter.chosen;
      }, true);

      if ($scope.win === false && $scope.numMisses == $scope.missesAllowed) {
        $scope.lost = true;
        _.each($scope.secretWord, function (letter) {
          letter.chosen = true;
        });
      }
    };

    $scope.makeLettersAbc = function () {
      var alphabet = language.alphabet();
      var response = [];
      for (var i in alphabet) {
        var temp = {name: alphabet[i], chosen: false};
        response.push(temp);
      }
      $scope.letters = response;
    };
    $scope.makeLettersAbc();

    $scope.reset = function () {
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


  });