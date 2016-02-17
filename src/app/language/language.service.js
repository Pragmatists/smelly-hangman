angular
  .module('tdd.language')
  .factory('language', function () {

    var englishLetters = 'abcdefghijklmnopqrstuvwxyz';

    return {
      alphabet: function () {
        return englishLetters.split('');
      }
    }

  });
