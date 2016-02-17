describe('HangmanController', function () {

  var initHangmanController
    , scope
    , http;

  beforeEach(module('tdd'));
  beforeEach(injectDependencies);
  beforeEach(createControllerInitializer);

  it('initializes', function () {
    var hangman = initHangmanController();

    expect(hangman).toBeDefined();
  });

  describe('on init', function () {

    it('neither wins nor lost', function () {
      initHangmanController();

      expect(scope.win).toBeFalsy();
      expect(scope.lost).toBeFalsy();
    });

    it('allows 6 misses', function () {
      initHangmanController();

      expect(scope.missesAllowed).toBe(6);
    });

    it('does not know about misses', function () {
      initHangmanController();

      expect(scope.numMisses).toBeUndefined();
    });

    it('does not know about secret word', function () {
      initHangmanController();

      expect(scope.secretWord).toBeUndefined();
    });

  });
  describe('on reset', function () {

    beforeEach(function () {
      http.whenGET('/hangman/words').respond(200, {
        words: ['apple']
      });
      initHangmanController();
      http.flush();
    });

    it('neither wins nor lost', function () {
      scope.reset();

      expect(scope.win).toBeFalsy();
      expect(scope.lost).toBeFalsy();
    });

    it('allows 6 misses', function () {
      scope.reset();

      expect(scope.missesAllowed).toBe(6);
    });

    it('set misses to 0', function () {
      scope.reset();

      expect(scope.numMisses).toBe(0);
    });

  });

  it('knows available letters', inject(function (language) {
    spyOn(language, 'alphabet').and.returnValue(['a', 'b']);

    initHangmanController();

    expect(scope.letters).toEqual([
      {name: 'a', chosen: false},
      {name: 'b', chosen: false}
    ]);
  }));


  function injectDependencies() {
    inject(function ($httpBackend) {
      http = $httpBackend;
    })
  }

  function createControllerInitializer() {
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      initHangmanController = function () {
        return $controller('HangmanController', {
          '$scope': scope
        });
      };
    });
  }

});
