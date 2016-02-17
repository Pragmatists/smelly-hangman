describe('HangmanController', function () {

  var initHangmanController
    , scope
    , http;

  beforeEach(module('tdd.hangman', 'tdd.language'));
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

    it('build secret word from one of available words', function () {
      availableWordsAre(['pie']);
      initHangmanController();
      http.flush();

      expect(scope.secretWord).toEqual([
        {name: 'p', chosen: false},
        {name: 'i', chosen: false},
        {name: 'e', chosen: false}
      ]);
    });

  });
  describe('on reset', function () {

    it('neither wins nor lost', function () {
      anyWordsAreAvailable();
      initHangmanController();
      http.flush();

      scope.reset();

      expect(scope.win).toBeFalsy();
      expect(scope.lost).toBeFalsy();
    });

    it('allows 6 misses', function () {
      anyWordsAreAvailable();
      initHangmanController();
      http.flush();

      scope.reset();

      expect(scope.missesAllowed).toBe(6);
    });

    it('sets misses to 0', function () {
      anyWordsAreAvailable();
      initHangmanController();
      http.flush();

      scope.reset();

      expect(scope.numMisses).toBe(0);
    });

    it('build secret word from one of available words', function () {
      availableWordsAre(['pie']);
      initHangmanController();
      http.flush();

      scope.reset();

      expect(scope.secretWord).toEqual([
        {name: 'p', chosen: false},
        {name: 'i', chosen: false},
        {name: 'e', chosen: false}
      ]);
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

  function anyWordsAreAvailable() {
    availableWordsAre(['apple']);
  }

  function availableWordsAre(words) {
    http.whenGET('/hangman/words').respond(200, {
      words: words
    });
  }

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
