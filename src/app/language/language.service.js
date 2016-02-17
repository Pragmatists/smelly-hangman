angular
  .module('tdd.language')
  .factory('language', function ($http) {

    var englishLetters = 'abcdefghijklmnopqrstuvwxyz';

    return {
      alphabet: function () {
        return englishLetters.split('');
      },
      words: function () {
        return $http.get('/hangman/words')
          .then(function (result) {
            return result.data.words;
          })
          .catch(function () {
            conole.log("no words has been found");
          });
      }
    }

  });
