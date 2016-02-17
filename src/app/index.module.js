(function () {
  'use strict';

  angular
    .module('tdd', [
      /* vendor */
      'ngMessages',
      'ui.router',
      'ui.bootstrap',
      /* app */
      'tdd.hangman',
      'tdd.language'
    ]);

})();
