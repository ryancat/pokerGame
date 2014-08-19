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
 * @fileOverview The controller for card table section
 * @ngInject
 * @author rchen
 */
      module.exports = function ($scope, $log, pokerGameSuitEnum, pokerGameKindEnum, pokerGameCardTableModal, pokerGamePlayerListModal) {
        angular.extend($scope, {
          deckConfig: $scope.deckConfig,
          pokerGameCardTableModal: pokerGameCardTableModal,
          finishedDealCard: false,
          players: [],
          cards: [],
          init: function () {
            pokerGameCardTableModal.setCardsToDraw($scope.deckConfig.deck);
          },
          dealCards: function () {
            var players = pokerGamePlayerListModal.getPlayers(), cards = pokerGameCardTableModal.getCardsToDraw(), numOfCards = cards.length, numOfPlayers = players.length, numOfCardsPerPlayer = numOfPlayers ? numOfCards / numOfPlayers : -1;
            players.forEach(function (player, playerIndex) {
              player.hasCards = cards.slice(playerIndex * numOfCardsPerPlayer, (playerIndex + 1) * numOfCardsPerPlayer);
            });
            $scope.finishedDealCard = true;
            $scope.players = players;
          }
        });
        $scope.init();
        $scope.$watch('finishedDealCard', function (finishedDealCard) {
          if (finishedDealCard) {
          }
        });
        /**
     * Watch on the change of cards playing
     */
        $scope.$watch('pokerGameCardTableModal.cardsPlaying.length', function (newLength, oldLength) {
          var newCards;
          if (angular.isUndefined(newLength)) {
            $log.warn('Invalid newLength');
            return;
          }
          // When a player played a new card
          if (newLength > oldLength) {
            newCards = pokerGameCardTableModal.getLatestPlayingCards();
          }
        });
        $log.log('The poker card table modal', pokerGameCardTableModal.getCardsToDraw());
        $log.log('The players modal', pokerGamePlayerListModal.getPlayers());
      };
    },
    {}
  ],
  2: [
    function (require, module, exports) {
      /**
 * @fileOverview The controller for game log section
 * @ngInject
 * @author rchen
 */
      module.exports = function ($scope, pokerGameSuitEnum, pokerGameKindEnum, pokerGameCardTableModal) {
        angular.extend($scope, {
          suit: pokerGameSuitEnum.getRandomSuit(),
          kind: pokerGameKindEnum.getRandomKind()
        });
      };
    },
    {}
  ],
  3: [
    function (require, module, exports) {
      /**
 * @fileOverview The controller for my card section
 * @ngInject
 * @author rchen
 */
      module.exports = function ($scope, pokerGameSuitEnum, pokerGameKindEnum, pokerGameMyCardsModal) {
        angular.extend($scope, {
          suit: pokerGameSuitEnum.getRandomSuit(),
          kind: pokerGameKindEnum.getRandomKind()
        });
      };
    },
    {}
  ],
  4: [
    function (require, module, exports) {
      /**
 * @fileOverview The controller for player list section
 * @ngInject
 * @author rchen
 */
      module.exports = function ($scope, $log, pokerGamePlayerListModal) {
        angular.extend($scope, {
          pokerGamePlayerListModal: pokerGamePlayerListModal,
          init: function () {
            var playerConfig = $scope.playerConfig || {};
            pokerGamePlayerListModal.setPlayers(playerConfig.players);
          }
        });
        $scope.init();
      };
    },
    {}
  ],
  5: [
    function (require, module, exports) {
      /**
 * @fileOverview The card directive
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, PokerGameCardFactory, pokerGameSuitEnum, pokerGameKindEnum) {
        return {
          restrict: 'EA',
          scope: {
            suit: '=',
            kind: '='
          },
          templateUrl: 'pokerGameCardTemplate.html',
          link: function (scope, element) {
            angular.extend(scope, {
              card: new PokerGameCardFactory({
                suit: scope.suit,
                kind: scope.kind
              }),
              pokerGameSuitEnum: pokerGameSuitEnum,
              init: function () {
              },
              isJoker: function () {
                return scope.card.isJoker();
              }
            });
            console.log(scope, scope.isJoker());
          }
        };
      };
    },
    {}
  ],
  6: [
    function (require, module, exports) {
      /**
 * @fileOverview The player directive
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, pokerGameSuitEnum, pokerGameKindEnum, PokerGamePlayerFactory, pokerGameCardTableModal, pokerGamePlayerListModal) {
        return {
          restrict: 'EA',
          scope: { playerId: '=' },
          templateUrl: 'pokerGamePlayerTemplate.html',
          link: function (scope, element) {
            angular.extend(scope, {
              pokerGameCardTableModal: pokerGameCardTableModal,
              player: pokerGamePlayerListModal.getPlayerById(scope.playerId),
              isCurrentPlayer: false
            });
            console.log(scope);
            /**
             * Watch on the change of cards playing
             */
            scope.$watch('pokerGameCardTableModal.cardsPlaying.length', function (newLength, oldLength) {
              var newCards, currentPlayer;
              if (angular.isUndefined(newLength)) {
                $log.warn('Invalid newLength');
                return;
              }
              // When a player played a new card
              if (newLength > oldLength) {
                newCards = pokerGameCardTableModal.getLatestPlayingCards();
              }
            });
          }
        };
      };
    },
    {}
  ],
  7: [
    function (require, module, exports) {
      /**
 * @fileoverview The card modal service
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, pokerGameSuitEnum, pokerGameKindEnum) {
        var PokerGameCardFactory = function (cardConfig) {
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
        PokerGameCardFactory.prototype = {
          setSuit: function (suit) {
            if (!pokerGameSuitEnum.has(suit)) {
              $log.warn('Invalid suit');
              return;
            }
            _suit = suit;
          },
          getSuit: function () {
            return _suit;
          },
          isRedCard: function () {
            return this.suit === pokerGameSuitEnum.HEART || this.suit === pokerGameSuitEnum.DIAMOND || this.kind === pokerGameKindEnum.JOKER_RED;
          },
          isBlackCard: function () {
            return this.suit === pokerGameSuitEnum.SPADE || this.suit === pokerGameSuitEnum.CLUB || this.kind === pokerGameKindEnum.JOKER_BLACK;
          },
          isJoker: function () {
            return pokerGameKindEnum.isJoker(this.kind);
          }
        };
        return PokerGameCardFactory;
      };
    },
    {}
  ],
  8: [
    function (require, module, exports) {
      /**
 * @fileoverview The deck modal service
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, pokerGameSuitEnum) {
        var PokerGameDeckFactory = function (deckConfig) {
          // Kinds of cards in different suits
          // Order in array doesn't matter
          this[pokerGameSuitEnum.SPADE] = [];
          this[pokerGameSuitEnum.HEART] = [];
          this[pokerGameSuitEnum.CLUB] = [];
          this[pokerGameSuitEnum.DIAMOND] = [];
          this[pokerGameSuitEnum.JOKER] = [];
          angular.extend(this, deckConfig);
        };
        PokerGameDeckFactory.prototype = {};
        return PokerGameDeckFactory;
      };
    },
    {}
  ],
  9: [
    function (require, module, exports) {
      /**
 * @fileoverview The player modal service
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log) {
        var PokerGamePlayerFactory = function (playerConfig) {
          angular.extend(this, {
            id: '',
            name: '',
            score: 0,
            hasCards: [],
            playOrder: 1,
            isCurrentPlayer: false
          }, playerConfig);
        };
        PokerGamePlayerFactory.prototype = {};
        return PokerGamePlayerFactory;
      };
    },
    {}
  ],
  10: [
    function (require, module, exports) {
      /**
 * @fileoverview The filter for showing right kind format on card
 * @ngInject
 * @author rchen
 */
      // global: _, module
      module.exports = function ($log, pokerGameKindEnum) {
        return function (kind) {
          if (!pokerGameKindEnum.has(kind)) {
            $log.warn('Invalid kind');
            return;
          }
          if (pokerGameKindEnum.isJoker(kind)) {
            return 'Joker';
          } else {
            return kind;
          }
        };
      };
    },
    {}
  ],
  11: [
    function (require, module, exports) {
      /**
 * @fileOverview The card table section data modal
 * @ngInject
 * @author rchen
 */
      module.exports = function (pokerGameSuitEnum, PokerGameCardFactory) {
        /**
     * Cards to draw in array of poker cards
     */
        var cardsToDraw = [],
          /**
         * Cards played in array of arries
         * @example
         * [
         *     [PokerGameCard1],
         *     [PokerGameCard1, PokerGameCard2]
         * ]
         */
          cardsPlayed = [],
          /**
         * Cards playing in array of arries
         * @example
         * [
         *     [PokerGameCard1],
         *     [PokerGameCard1, PokerGameCard2]
         * ]
         */
          cardsPlaying = [];
        angular.extend(this, {
          getLatestPlayingCards: function () {
            return _.last(cardsPlaying);
          },
          setCardsToDraw: function (deck) {
            cardsToDraw = _.shuffle(_.flatten(_.keys(deck).map(function (suit) {
              var pokerCardsBySuit = [];
              if (pokerGameSuitEnum.has(suit)) {
                pokerCardsBySuit = deck[suit].map(function (kind) {
                  return new PokerGameCardFactory({
                    suit: suit,
                    kind: kind
                  });
                });
              }
              return pokerCardsBySuit;
            })));
          },
          getCardsToDraw: function () {
            return cardsToDraw;
          },
          getNumberOfCardsToDraw: function () {
            return cardsToDraw.length;
          }
        });
      };
    },
    {}
  ],
  12: [
    function (require, module, exports) {
      /**
 * @fileoverview The card deck enum
 * @ngInject
 * @author rchen
 */
      // global: _, module
      module.exports = function () {
        var pokerGameKindEnum = Object.freeze({
            ACE: '1',
            TWO: '2',
            THREE: '3',
            FOUR: '4',
            FIVE: '5',
            SIX: '6',
            SEVEN: '7',
            EIGHT: '8',
            NINE: '9',
            TEN: '10',
            JACK: 'J',
            QUEEN: 'Q',
            KING: 'K',
            JOKER_RED: 'R Joker',
            JOKER_BLACK: 'B Joker'
          });
        angular.extend(this, {
          ACE: pokerGameKindEnum.Ace,
          TWO: pokerGameKindEnum.TWO,
          THREE: pokerGameKindEnum.THREE,
          FOUR: pokerGameKindEnum.FOUR,
          FIVE: pokerGameKindEnum.FIVE,
          SIX: pokerGameKindEnum.SIX,
          SEVEN: pokerGameKindEnum.SEVEN,
          EIGHT: pokerGameKindEnum.EIGHT,
          NINE: pokerGameKindEnum.NINE,
          TEN: pokerGameKindEnum.TEN,
          JACK: pokerGameKindEnum.JACK,
          QUEEN: pokerGameKindEnum.QUEEN,
          KING: pokerGameKindEnum.KING,
          JOKER_RED: pokerGameKindEnum.JOKER_RED,
          JOKER_BLACK: pokerGameKindEnum.JOKER_BLACK,
          has: function (kind) {
            return _.values(pokerGameKindEnum).indexOf(kind) >= 0;
          },
          getRandomKind: function () {
            var enumKeys = _.keys(pokerGameKindEnum), enumKeysLength = enumKeys.length;
            return pokerGameKindEnum[enumKeys[_.random(0, enumKeysLength - 1)]];
          },
          isJoker: function (kind) {
            return kind === pokerGameKindEnum.JOKER_BLACK || kind === pokerGameKindEnum.JOKER_RED;
          }
        });
      };
    },
    {}
  ],
  13: [
    function (require, module, exports) {
      /**
 * @fileOverview The my cards section data modal
 * @ngInject
 * @author rchen
 */
      module.exports = function () {
        angular.extend(this, {});
      };
    },
    {}
  ],
  14: [
    function (require, module, exports) {
      /**
 * @fileOverview The player list section data modal
 * @ngInject
 * @author rchen
 */
      // Global: _, module
      module.exports = function ($log, PokerGamePlayerFactory) {
        var players = [];
        angular.extend(this, {
          getPlayers: function () {
            return players;
          },
          setPlayers: function (playerList) {
            if (!angular.isArray(playerList)) {
              $log.warn('Invalid playerList');
              return;
            }
            this.resetPlayers();
            playerList.forEach(function (player) {
              players.push(new PokerGamePlayerFactory(player));
            });
          },
          resetPlayers: function () {
            players.length = 0;
          },
          getNumberOfPlayers: function () {
            return players.length;
          },
          getPlayerById: function (playerId) {
            return _.find(players, function (player) {
              return player.id === playerId;
            });
          },
          getCurrentPlayer: function () {
            return _.find(players, function (player) {
              return player.isCurrentPlayer;
            });
          }
        });
      };
    },
    {}
  ],
  15: [
    function (require, module, exports) {
      /**
 * @fileoverview The card suit enum
 * @ngInject
 * @author rchen
 */
      // global: _, module
      module.exports = function () {
        var pokerGameSuitEnum = Object.freeze({
            SPADE: 'spade',
            HEART: 'heart',
            CLUB: 'club',
            DIAMOND: 'diamond',
            JOKER: 'joker'
          });
        angular.extend(this, {
          SPADE: pokerGameSuitEnum.SPADE,
          HEART: pokerGameSuitEnum.HEART,
          CLUB: pokerGameSuitEnum.CLUB,
          DIAMOND: pokerGameSuitEnum.DIAMOND,
          JOKER: pokerGameSuitEnum.jOKER,
          has: function (suit) {
            return _.values(pokerGameSuitEnum).indexOf(suit) >= 0;
          },
          getRandomSuit: function () {
            var enumKeys = _.keys(pokerGameSuitEnum), enumKeysLength = enumKeys.length;
            return pokerGameSuitEnum[enumKeys[_.random(0, enumKeysLength - 1)]];
          }
        });
      };
    },
    {}
  ],
  16: [
    function (require, module, exports) {
      angular.module('pokerGame', ['pokerGameTemplate']).value('pokerGameOptions', {}).filter('pokerGameKindOnCardFilter', require('./js/filters/pokerGameKindOnCardFilter')).controller('pokerGamePlayerListController', require('./js/controllers/pokerGamePlayerListController')).controller('pokerGameCardTableController', require('./js/controllers/pokerGameCardTableController')).controller('pokerGameMyCardsController', require('./js/controllers/pokerGameMyCardsController')).controller('pokerGameGameLogController', require('./js/controllers/pokerGameGameLogController')).factory('PokerGameCardFactory', require('./js/factories/pokerGameCardFactory')).factory('PokerGameDeckFactory', require('./js/factories/pokerGameDeckFactory')).factory('PokerGamePlayerFactory', require('./js/factories/pokerGamePlayerFactory')).service('pokerGameSuitEnum', require('./js/services/pokerGameSuitEnumService')).service('pokerGameKindEnum', require('./js/services/pokerGameKindEnumService')).service('pokerGameMyCardsModal', require('./js/services/pokerGameMyCardsModalService')).service('pokerGamePlayerListModal', require('./js/services/pokerGamePlayerListModalService')).service('pokerGameCardTableModal', require('./js/services/pokerGameCardTableModalService')).directive('pokerGameCard', require('./js/directives/pokerGameCardDirective')).directive('pokerGamePlayer', require('./js/directives/pokerGamePlayerDirective')).directive('pokerGame', function () {
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
      './js/controllers/pokerGameCardTableController': 1,
      './js/controllers/pokerGameGameLogController': 2,
      './js/controllers/pokerGameMyCardsController': 3,
      './js/controllers/pokerGamePlayerListController': 4,
      './js/directives/pokerGameCardDirective': 5,
      './js/directives/pokerGamePlayerDirective': 6,
      './js/factories/pokerGameCardFactory': 7,
      './js/factories/pokerGameDeckFactory': 8,
      './js/factories/pokerGamePlayerFactory': 9,
      './js/filters/pokerGameKindOnCardFilter': 10,
      './js/services/pokerGameCardTableModalService': 11,
      './js/services/pokerGameKindEnumService': 12,
      './js/services/pokerGameMyCardsModalService': 13,
      './js/services/pokerGamePlayerListModalService': 14,
      './js/services/pokerGameSuitEnumService': 15
    }
  ]
}, {}, [16]));
angular.module('pokerGameTemplate', ['pokerGame.html', 'pokerGameCardTablePartial.html', 'pokerGameCardTemplate.html', 'pokerGameGameLogPartial.html', 'pokerGameMyCardsPartial.html', 'pokerGamePlayerListPartial.html', 'pokerGamePlayerTemplate.html']);

angular.module("pokerGame.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGame.html",
    "<div></div>");
}]);

angular.module("pokerGameCardTablePartial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameCardTablePartial.html",
    "<div ng-controller=\"pokerGameCardTableController\" class=\"card-table\">\n" +
    "    \n" +
    "    This is card table\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" \n" +
    "        ng-disabled=\"finishedDealCard\" ng-click=\"dealCards()\">\n" +
    "        Deal Cards\n" +
    "    </button>\n" +
    "    {{ players }}\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"player in players\">\n" +
    "            <span>{{player.name}}</span>\n" +
    "            <ul class=\"clearfix\">\n" +
    "                <li ng-repeat=\"card in player.hasCards\" class=\"pull-left\">\n" +
    "                    <div poker-game-card\n" +
    "                        suit=\"card.suit\"\n" +
    "                        kind=\"card.kind\" ></div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    \n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGameCardTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameCardTemplate.html",
    "<div class=\"poker-game-card\" ng-class=\"{ 'red-card': card.isRedCard(), 'black-card': card.isBlackCard() }\">\n" +
    "    <span class=\"card-suit\" ng-class=\"{ 'icon-spades': suit == pokerGameSuitEnum.SPADE, 'icon-heart': suit == pokerGameSuitEnum.HEART, 'icon-clubs': suit == pokerGameSuitEnum.CLUB, 'icon-diamonds': suit == pokerGameSuitEnum.DIAMOND }\" ng-hide=\"card.isJoker()\"></span>\n" +
    "    \n" +
    "    <span class=\"card-kind\">{{ kind | pokerGameKindOnCardFilter }}</span>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("pokerGameGameLogPartial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameGameLogPartial.html",
    "<div ng-controller=\"pokerGameGameLogController\" class=\"panel panel-default left-panel pull-left\">\n" +
    "\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <div class=\"panel-title\">Game log</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body panel-game-log\">\n" +
    "        Logs go here\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"cleanLog()\">\n" +
    "            Clean logs\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGameMyCardsPartial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameMyCardsPartial.html",
    "<div ng-controller=\"pokerGameMyCardsController\" class=\"my-cards-section\">\n" +
    "\n" +
    "    <span> This is my cards partial </span>\n" +
    "\n" +
    "    <div poker-game-card\n" +
    "        suit=\"suit\"\n" +
    "        kind=\"kind\" ></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGamePlayerListPartial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGamePlayerListPartial.html",
    "<div ng-controller=\"pokerGamePlayerListController\" class=\"player-list\">\n" +
    "    This is player list\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"player in pokerGamePlayerListModal.getPlayers()\" class=\"pull-left\">\n" +
    "            <div poker-game-player\n" +
    "                player-id=\"player.id\"></div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGamePlayerTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGamePlayerTemplate.html",
    "<div class=\"poker-game-player\">\n" +
    "\n" +
    "    <div class=\"current-player-arrow\">\n" +
    "        <span class=\"icon-arrow-down\" ng-class=\"{ 'active': isCurrentPlayer }\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"player-avatar thumbnail\">\n" +
    "        <span class=\"icon-user\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"player-tag panel panel-default\">\n" +
    "        <span class=\"player-tag-text\">{{ player.name }}</span>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
