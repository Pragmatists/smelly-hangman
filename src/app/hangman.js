angular
  .module('tdd')
  .controller('hangmanController', function ($http, $scope, language) {

    var words = [];

    var AskForWords = function (user, password, $state) {
      $http.get('/hangman/words').then(function (result) {
        words = result.data.words;
      }, function (result) {
        conole.log("no words has been found");
      }).then(function () {
        $scope.reset();
      });
    };

    AskForWords();

    $scope.missesAllowed = 6;

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

      $scope.secretWord = makeLetters(words[Math.floor(Math.random() * words.length)]);
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
