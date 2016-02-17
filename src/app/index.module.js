(function () {
  'use strict';

  angular
    .module('tdd', [
      /* vendor */
      'ngMessages',
      'ui.router',
      'ui.bootstrap',
      'tdd.transients',
      /* app */
      'tdd.language'
    ]);

})();
