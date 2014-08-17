(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == 'function' && require;
        if (!u && a)
          return a(o, !0);
        if (i)
          return i(o, !0);
        throw new Error('Cannot find module \'' + o + '\'');
      }
      var f = n[o] = { exports: {} };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == 'function' && require;
  for (var o = 0; o < r.length; o++)
    s(r[o]);
  return s;
}({
  1: [
    function (require, module, exports) {
      /**
 * @fileoverview The card modal service
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, pokerGameSuitEnum) {
        var PokerGameCard = function (cardConfig) {
          /**
         * @public
         */
          angular.extend(this, {
            suit: pokerGameSuitEnum.SPADE,
            kind: pokerGameKindEnum.ACE,
            isPlayed: false,
            belongsToPlayer: undefined
          }, cardConfig);
        };
        PokerGameCard.prototype = {
          setSuit: function (suit) {
            if (!pokerGameSuitEnum.has(suit)) {
              $log.warn('Invalid suit');
              return;
            }
            _suit = suit;
          },
          getSuit: function () {
            return _suit;
          }
        };
        return PokerGameCard;
      };
    },
    {}
  ],
  2: [
    function (require, module, exports) {
      /**
 * @fileoverview The deck modal service
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, pokerGameKindEnum) {
        var PokerGameDeck = function (deckConfig) {
          angular.extend(this, {
            spadeCards: [],
            heartCards: [],
            clubCards: [],
            diamondCards: [],
            jokerCards: []
          }, deckConfig);
        };
        PokerGameCard.prototype = {};
        return PokerGameCard;
      };
    },
    {}
  ],
  3: [
    function (require, module, exports) {
      /**
 * @fileoverview The player modal service
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log) {
        var PokerGamePlayer = function (playerConfig) {
          angular.extend(this, {
            id: '',
            name: '',
            score: 0,
            hasCards: [],
            playOrder: 1
          }, playerConfig);
        };
        PokerGameCard.prototype = {};
        return PokerGameCard;
      };
    },
    {}
  ],
  4: [
    function (require, module, exports) {
      angular.module('pokerGame', ['pokerGameTemplate']).value('pokerGameOptions', {}).factory('PokerGameCard', require('./js/factories/pokerGameCardFactory')).factory('PokerGameDeck', require('./js/factories/pokerGameDeckFactory')).factory('PokerGamePlayer', require('./js/factories/pokerGamePlayerFactory')).directive('pokerGameCard').directive('pokerGame', function () {
        return {
          restrict: '',
          scope: {},
          templateUrl: 'pokerGame.html',
          link: function (scope, element) {
            angular.extend(scope, {});
            // teardown
            scope.$on('$destroy', function () {
            });
          }
        };
      });
    },
    {
      './js/factories/pokerGameCardFactory': 1,
      './js/factories/pokerGameDeckFactory': 2,
      './js/factories/pokerGamePlayerFactory': 3
    }
  ]
}, {}, [4]));
angular.module('pokerGameTemplate', ['pokerGame.html']);

angular.module("pokerGame.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGame.html",
    "<div></div>");
}]);
