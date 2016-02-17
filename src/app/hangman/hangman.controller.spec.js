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
      var hangman = initHangmanController();

      expect(hangman.win).toBeFalsy();
      expect(hangman.lost).toBeFalsy();
    });

    it('allows 6 misses', function () {
      var hangman = initHangmanController();

      expect(hangman.missesAllowed).toBe(6);
    });

    it('does not know about misses', function () {
      var hangman = initHangmanController();

      expect(hangman.numMisses).toBeUndefined();
    });

    it('does not know about secret word', function () {
      var hangman = initHangmanController();

      expect(hangman.secretWord).toBeUndefined();
    });

    it('build secret word from one of available words', function () {
      availableWordsAre(['pie']);
      var hangman = initHangmanController();
      http.flush();

      expect(hangman.secretWord).toEqual([
        {name: 'p', chosen: false},
        {name: 'i', chosen: false},
        {name: 'e', chosen: false}
      ]);
    });

  });
  describe('on reset', function () {

    it('neither wins nor lost', function () {
      anyWordsAreAvailable();
      var hangman = initHangmanController();
      http.flush();

      hangman.reset();

      expect(hangman.win).toBeFalsy();
      expect(hangman.lost).toBeFalsy();
    });

    it('allows 6 misses', function () {
      anyWordsAreAvailable();
      var hangman = initHangmanController();
      http.flush();

      hangman.reset();

      expect(hangman.missesAllowed).toBe(6);
    });

    it('sets misses to 0', function () {
      anyWordsAreAvailable();
      var hangman = initHangmanController();
      http.flush();

      hangman.reset();

      expect(hangman.numMisses).toBe(0);
    });

    it('build secret word from one of available words', function () {
      availableWordsAre(['pie']);
      var hangman = initHangmanController();
      http.flush();

      hangman.reset();

      expect(hangman.secretWord).toEqual([
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
