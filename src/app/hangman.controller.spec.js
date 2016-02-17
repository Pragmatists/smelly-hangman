describe('HangmanController', function () {

  var initHangmanController
    , scope;

  beforeEach(module('tdd'));
  beforeEach(createScopeForController);
  beforeEach(createControllerInitializer);

  it('initializes', function () {
    var hangman = initHangmanController();

    expect(hangman).toBeDefined();
  });

  it('allows 6 misses', function () {
    initHangmanController();

    expect(scope.missesAllowed).toBe(6);
  });

  it('knows available letters', inject(function (language) {
    spyOn(language, 'alphabet').and.returnValue(['a', 'b']);

    initHangmanController();

    expect(scope.letters).toEqual([
      {name: 'a', chosen: false},
      {name: 'b', chosen: false}
    ]);
  }));

  function createScopeForController() {
    inject(function (_$rootScope_) {
      scope = _$rootScope_.$new();
    });
  }

  function createControllerInitializer() {
    inject(function ($controller) {
      initHangmanController = function () {
        return $controller('HangmanController', {
          '$scope': scope
        });
      };
    });
  }

});
