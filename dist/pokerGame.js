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
      module.exports = function ($scope, $log, $q, $timeout, pokerGameSuitEnum, pokerGameKindEnum, pokerGameSpeedEnum, pokerGameCardsNumberEnum, pokerGameCardTableModal, pokerGamePlayerListModal) {
        angular.extend($scope, {
          pokerGameCardTableModal: pokerGameCardTableModal,
          pokerGamePlayerListModal: pokerGamePlayerListModal,
          finishedDealCard: false,
          cardsPlayingStatus: {},
          players: pokerGamePlayerListModal.getPlayers(),
          init: function () {
            pokerGameCardTableModal.setCardsToDrawByDeck($scope.deckConfig.deck);
          },
          dealCards: function () {
            var players = pokerGamePlayerListModal.getPlayers(), cards = pokerGameCardTableModal.getCardsToDraw(), numOfCards = cards.length, numOfPlayers = players.length, numOfCardsPerPlayer = numOfPlayers ? numOfCards / numOfPlayers : -1;
            players.forEach(function (player, playerIndex) {
              player.hasCards = cards.slice(playerIndex * numOfCardsPerPlayer, (playerIndex + 1) * numOfCardsPerPlayer);
              player.hasCards.forEach(function (card) {
                card.belongsToPlayerId = player.id;
              });
            });
            $scope.finishedDealCard = true;
            // Get the next player (fist one) to play
            $scope.switchToNextPlayer();
          },
          waitForPlayer: function () {
            var deferred = $q.defer(), playSpeed = $scope.ruleConfig.playSpeed, timeout = pokerGameSpeedEnum.getTimeoutMiliseconds(playSpeed);
            if (playSpeed === pokerGameSpeedEnum.ALWAYS_WAIT) {
              return;
            }
            $scope.playTimeout = $timeout($scope.switchToNextPlayer, timeout);
          },
          switchToNextPlayer: function () {
            // Set the next player to be the current player
            var nextPlayer = pokerGamePlayerListModal.getNextPlayer();
            pokerGamePlayerListModal.setCurrentPlayer(nextPlayer);
            // Wait for the current player play
            $scope.waitForPlayer();
          },
          handlePlayingCards: function () {
            var newCards = pokerGameCardTableModal.getLatestPlayingCards(), playerId;
            // When someone played no cards
            if (newCards.length === 0) {
              return;
            }
            playerId = newCards[0].belongsToPlayerId;
            $scope.cardsPlayingStatus[playerId] = newCards;
            // Wait the next player play cards
            // If everyone has tried to play card, we will decide who win this round
            if (angular.isDefined($scope.playTimeout)) {
              $timeout.cancel($scope.playTimeout);
            }
            $scope.switchToNextPlayer();
          }
        });
        $scope.init();
        // $scope.$watch('finishedDealCard', function (finishedDealCard) {
        //     if (finishedDealCard) {
        //         // Game started
        //         // Wait for the first player play card
        //         $scope.waitForPlayer(pokerGamePlayerListModal.getFirstPlayer());
        //     }
        // });
        /**
     * Watch on the change of cards playing
     * This will trigger the next player plays card
     */
        $scope.$watch('pokerGameCardTableModal.getCardsPlaying().length', function (newLength, oldLength) {
          if (angular.isUndefined(newLength)) {
            $log.warn('Invalid newLength');
            return;
          }
          // When a player played a new card
          if (newLength > oldLength) {
            $scope.handlePlayingCards();
          }
        });  // setInterval(function () {
             //     $log.log('Some cards are playing', pokerGameCardTableModal.cardsPlaying);
             // }, 1000);
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
      module.exports = function ($scope, pokerGameSuitEnum, pokerGameKindEnum, pokerGameCardTableModal, pokerGamePlayerListModal) {
        angular.extend($scope, {
          pokerGameCardTableModal: pokerGameCardTableModal,
          logs: [],
          cleanLog: function () {
            $scope.logs.length = 0;
          }
        });
        /**
     * Watch on the change of cards playing
     */
        $scope.$watch('pokerGameCardTableModal.getCardsPlaying().length', function (newLength, oldLength) {
          var newCards, playerId, player;
          if (angular.isUndefined(newLength)) {
            $log.warn('Invalid newLength');
            return;
          }
          // When a player played a new card
          if (newLength > oldLength) {
            newCards = pokerGameCardTableModal.getLatestPlayingCards();
            // When someone played no cards
            if (newCards.length === 0) {
              $scope.logs.push('Someone played no cards');
              return;
            }
            playerId = newCards[0].belongsToPlayerId;
            player = pokerGamePlayerListModal.getPlayerById(playerId);
            $scope.logs.push(player.name + ' played ' + newCards.map(function (card) {
              return card.suit + ' ' + card.kind;
            }).join(', '));
          }
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
      module.exports = function ($log, $scope, pokerGameSuitEnum, pokerGameKindEnum, pokerGamePlayerListModal, pokerGameCardTableModal) {
        angular.extend($scope, {
          homePlayer: pokerGamePlayerListModal.getHomePlayer(),
          selectedCards: [],
          init: function () {
          },
          playCards: function () {
            var cardsToPlay = _.filter($scope.homePlayer.hasCards, 'isSelected');
            cardsToPlay.forEach(function (card) {
              card.isPlaying = true;
              card.isSelected = false;
            });
            // home user no longer has played cards
            // The cards to play is not being played
            $scope.homePlayer.hasCards = _.difference($scope.homePlayer.hasCards, cardsToPlay);
            pokerGameCardTableModal.addToCardsPlaying(cardsToPlay);
            pokerGameCardTableModal.removeCardsFromCardsToDraw(cardsToPlay);
          }
        });
        $scope.init();
        $scope.$watch('homePlayer.hasCards', function (cards) {
          if (!angular.isArray(cards)) {
            $log.warn('Invalid cards');
            return;
          }
          $scope.selectedCards = _.filter(cards, 'isSelected');
        }, true);
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
      module.exports = function ($log, PokerGameCardFactory, pokerGameSuitEnum, pokerGameKindEnum, pokerGameCardTableModal) {
        return {
          restrict: 'EA',
          scope: { cardId: '=' },
          templateUrl: 'pokerGameCardTemplate.html',
          link: function (scope, element) {
            angular.extend(scope, {
              card: pokerGameCardTableModal.getCardById(scope.cardId),
              pokerGameSuitEnum: pokerGameSuitEnum,
              isSelected: false,
              isPlaying: false,
              isPlayed: false,
              init: function () {
              },
              isJoker: function () {
                return scope.card.isJoker();
              },
              toggleSelectCard: function () {
                if (scope.card.isPlaying) {
                  $log.warn('Played cards cannot be selected');
                  return;
                }
                scope.card.isSelected = !scope.card.isSelected;
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
          scope: {
            playerId: '=',
            isCurrentPlayer: '='
          },
          templateUrl: 'pokerGamePlayerTemplate.html',
          link: function (scope, element) {
            angular.extend(scope, {
              pokerGameCardTableModal: pokerGameCardTableModal,
              player: pokerGamePlayerListModal.getPlayerById(scope.playerId)
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
      module.exports = function ($log, pokerGameSuitEnum, pokerGameKindEnum, pokerGameUtil) {
        var PokerGameCardFactory = function (cardConfig) {
          /**
         * @public
         */
          angular.extend(this, {
            id: pokerGameUtil.makeRandomId(),
            suit: pokerGameSuitEnum.SPADE,
            kind: pokerGameKindEnum.ACE,
            isPlayed: false,
            isPlaying: false,
            isSelected: false,
            belongsToPlayerId: undefined
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
      module.exports = function ($log, pokerGameSuitEnum, pokerGameUtil) {
        var PokerGameDeckFactory = function (deckConfig) {
          // Kinds of cards in different suits
          // Order in array doesn't matter
          this[pokerGameSuitEnum.SPADE] = [];
          this[pokerGameSuitEnum.HEART] = [];
          this[pokerGameSuitEnum.CLUB] = [];
          this[pokerGameSuitEnum.DIAMOND] = [];
          this[pokerGameSuitEnum.JOKER] = [];
          this.id = pokerGameUtil.makeRandomId();
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
            isCurrentPlayer: false,
            isHomePlayer: false,
            nextPlayerId: ''
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
          setCardsToDrawByDeck: function (deck) {
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
          setCardsToDraw: function (cards) {
            this.resetCardsToDraw();
            Array.prototype.push.apply(cardsToDraw, cards);
          },
          resetCardsToDraw: function () {
            cardsToDraw.length = 0;
          },
          getCardsToDraw: function () {
            return cardsToDraw;
          },
          getNumberOfCardsToDraw: function () {
            return cardsToDraw.length;
          },
          removeCardsFromCardsToDraw: function (cards) {
            this.setCardsToDraw(_.difference(cardsToDraw, cards));
          },
          getCardByIdInCategory: function (cardId, cardsCategory) {
            if (!angular.isArray(cardsCategory)) {
              $log.warn('Invalid cardsCategory');
              return;
            }
            return _.find(_.flatten(cardsCategory), function (card) {
              return card.id === cardId;
            });
          },
          getCardById: function (cardId) {
            var card;
            if (angular.isDefined(card = this.getCardByIdInCategory(cardId, cardsToDraw))) {
              return card;
            }
            if (angular.isDefined(card = this.getCardByIdInCategory(cardId, cardsPlayed))) {
              return card;
            }
            if (angular.isDefined(card = this.getCardByIdInCategory(cardId, cardsPlaying))) {
              return card;
            }
            return card;
          },
          addToCardsPlaying: function (cards) {
            if (!angular.isArray(cards)) {
              $log.warn('Invalid cards');
              return;
            }
            cardsPlaying.push(cards);
          },
          getCardsPlaying: function () {
            return cardsPlaying;
          }
        });
      };
    },
    {}
  ],
  12: [
    function (require, module, exports) {
      /**
 * @fileoverview The limit on number of cards played per round
 * @ngInject
 * @author rchen
 */
      // global: _, module
      module.exports = function () {
        var pokerGameCardsNumberEnum = Object.freeze({
            NO_LIMIT: '0',
            SAME: '1'
          });
        angular.extend(this, {
          NO_LIMIT: pokerGameCardsNumberEnum.NO_LIMIT,
          SAME: pokerGameCardsNumberEnum.SAME
        });
      };
    },
    {}
  ],
  13: [
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
  14: [
    function (require, module, exports) {
      /**
 * @fileOverview The my cards section data modal
 * @ngInject
 * @author rchen
 */
      module.exports = function ($log, pokerGamePlayerListModal) {
        var myCards = [];
        angular.extend(this, {
          setMyCards: function (cards) {
            if (!angular.isArray(cards)) {
              $log.warn('Invalid cards');
              return;
            }
            this.resetMyCards();
            Array.prototype.push.apply(myCards, cards);
          },
          resetMyCards: function () {
            myCards.length = 0;
          }
        });
      };
    },
    {}
  ],
  15: [
    function (require, module, exports) {
      /**
 * @fileOverview The player list section data modal
 * @ngInject
 * @author rchen
 */
      // Global: _, module
      module.exports = function ($log, PokerGamePlayerFactory, pokerGameUtil) {
        var players = [];
        angular.extend(this, {
          getPlayers: function () {
            return players;
          },
          setPlayers: function (playerList) {
            var numOfPlayer, orderedPlayers;
            if (!angular.isArray(playerList)) {
              $log.warn('Invalid playerList');
              return;
            }
            numOfPlayer = playerList.length;
            orderedPlayers = _.sortBy(playerList, 'playOrder');
            this.resetPlayers();
            // Initialize the random id
            orderedPlayers.forEach(function (player, playerIndex) {
              player.id = pokerGameUtil.makeRandomId();
            });
            // Set the next player id, and create player
            orderedPlayers.forEach(function (player, playerIndex) {
              player.nextPlayerId = orderedPlayers[(playerIndex + 1) % numOfPlayer].id;
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
          },
          setCurrentPlayer: function (player) {
            if (!(player instanceof PokerGamePlayerFactory)) {
              $log.warn('Invalid player');
              return;
            }
            players.forEach(function (p) {
              p.isCurrentPlayer = false;
            });
            player.isCurrentPlayer = true;
          },
          setHomePlayerById: function (playerId) {
            var player = this.getPlayerById(playerid);
            if (angular.isUndefined(player)) {
              $log.warn('Invalid playerId');
              return;
            }
            this.resetHomePlayer();
            player.isHomePlayer = true;
          },
          resetHomePlayer: function () {
            players.forEach(function (player) {
              player.isHomePlayer = false;
            });
          },
          getHomePlayer: function () {
            return _.find(players, function (player) {
              return player.isHomePlayer;
            });
          },
          getFirstPlayer: function () {
            var orderedPlayers = _.sortBy(players, 'playOrder');
            if (orderedPlayers.length === 0) {
              $log.warn('Invalid players number');
              return;
            }
            return orderedPlayers[0];
          },
          getNextPlayer: function () {
            var currentPlayer = this.getCurrentPlayer(), nextPlayerId, nextPlayer;
            // If there is no current player 
            // We will set the first player to be the current player   
            if (angular.isUndefined(currentPlayer)) {
              return this.getFirstPlayer();
            }
            nextPlayerId = currentPlayer.nextPlayerId;
            nextPlayer = _.find(players, function (player) {
              return player.id === nextPlayerId;
            });
            if (angular.isUndefined(nextPlayer)) {
              $log.warn('Invalid next player');
              return;
            }
            return nextPlayer;
          }
        });
      };
    },
    {}
  ],
  16: [
    function (require, module, exports) {
      /**
 * @fileoverview The play speed enum
 * @ngInject
 * @author rchen
 */
      // global: _, module
      module.exports = function () {
        var pokerGameSpeedEnum = Object.freeze({
            ALWAYS_WAIT: '0',
            SLOW: '1',
            NORMAL: '2',
            FAST: '3'
          });
        angular.extend(this, {
          ALWAYS_WAIT: pokerGameSpeedEnum.ALWAYS_WAIT,
          SLOW: pokerGameSpeedEnum.SLOW,
          NORMAL: pokerGameSpeedEnum.NORMAL,
          FAST: pokerGameSpeedEnum.FAST,
          getTimeoutMiliseconds: function (speed) {
            switch (speed) {
            case pokerGameSpeedEnum.ALWAYS_WAIT:
              // Meaning we are waiting forever
              return -1;
            case pokerGameSpeedEnum.SLOW:
              // Wait for one hour
              return 60000;
            case pokerGameSpeedEnum.NORMAL:
              return 10000;
            case pokerGameSpeedEnum.FAST:
              return 6000;
            default:
              return 10000;
            }
          }
        });
      };
    },
    {}
  ],
  17: [
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
  18: [
    function (require, module, exports) {
      /**
 * @fileOverview Some util functions
 * @ngInject
 * @author rchen
 */
      module.exports = function () {
        var api = {
            makeRandomId: function (idLength) {
              var text = '', possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', i;
              idLength = angular.isNumber(idLength) ? idLength : 5;
              for (i = 0; i < idLength; i += 1) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
              }
              return text;
            }
          };
        return api;
      };
    },
    {}
  ],
  19: [
    function (require, module, exports) {
      angular.module('pokerGame', ['pokerGameTemplate']).value('pokerGameOptions', {}).filter('pokerGameKindOnCardFilter', require('./js/filters/pokerGameKindOnCardFilter')).controller('pokerGamePlayerListController', require('./js/controllers/pokerGamePlayerListController')).controller('pokerGameCardTableController', require('./js/controllers/pokerGameCardTableController')).controller('pokerGameMyCardsController', require('./js/controllers/pokerGameMyCardsController')).controller('pokerGameGameLogController', require('./js/controllers/pokerGameGameLogController')).factory('PokerGameCardFactory', require('./js/factories/pokerGameCardFactory')).factory('PokerGameDeckFactory', require('./js/factories/pokerGameDeckFactory')).factory('PokerGamePlayerFactory', require('./js/factories/pokerGamePlayerFactory')).service('pokerGameSuitEnum', require('./js/services/pokerGameSuitEnumService')).service('pokerGameKindEnum', require('./js/services/pokerGameKindEnumService')).service('pokerGameSpeedEnum', require('./js/services/pokerGameSpeedEnumService')).service('pokerGameCardsNumberEnum', require('./js/services/pokerGameCardsNumberEnumService')).service('pokerGameMyCardsModal', require('./js/services/pokerGameMyCardsModalService')).service('pokerGamePlayerListModal', require('./js/services/pokerGamePlayerListModalService')).service('pokerGameCardTableModal', require('./js/services/pokerGameCardTableModalService')).service('pokerGameUtil', require('./js/services/pokerGameUtilService')).directive('pokerGameCard', require('./js/directives/pokerGameCardDirective')).directive('pokerGamePlayer', require('./js/directives/pokerGamePlayerDirective')).directive('pokerGame', function () {
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
      './js/services/pokerGameCardsNumberEnumService': 12,
      './js/services/pokerGameKindEnumService': 13,
      './js/services/pokerGameMyCardsModalService': 14,
      './js/services/pokerGamePlayerListModalService': 15,
      './js/services/pokerGameSpeedEnumService': 16,
      './js/services/pokerGameSuitEnumService': 17,
      './js/services/pokerGameUtilService': 18
    }
  ]
}, {}, [19]));
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
    "\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"player in players\">\n" +
    "            <ul class=\"clearfix\">\n" +
    "                <li ng-repeat=\"card in cardsPlayingStatus[player.id]\" class=\"pull-left\">\n" +
    "                    <div poker-game-card card-id=\"card.id\" ></div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGameCardTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameCardTemplate.html",
    "<div class=\"poker-game-card\" \n" +
    "    ng-class=\"{ 'red-card': card.isRedCard(), 'black-card': card.isBlackCard(), 'selected': card.isSelected, 'playing': card.isPlaying }\"\n" +
    "    ng-click=\"toggleSelectCard()\">\n" +
    "    <span class=\"card-suit\" ng-class=\"{ 'icon-spades': card.suit == pokerGameSuitEnum.SPADE, 'icon-heart': card.suit == pokerGameSuitEnum.HEART, 'icon-clubs': card.suit == pokerGameSuitEnum.CLUB, 'icon-diamonds': card.suit == pokerGameSuitEnum.DIAMOND }\" ng-hide=\"card.isJoker()\"></span>\n" +
    "    \n" +
    "    <span class=\"card-kind\">{{ card.kind | pokerGameKindOnCardFilter }}</span>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("pokerGameGameLogPartial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameGameLogPartial.html",
    "<div ng-controller=\"pokerGameGameLogController\" class=\"panel panel-default left-panel\">\n" +
    "\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <div class=\"panel-title\">Game log</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body panel-game-log\">\n" +
    "        Logs go here\n" +
    "\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"log in logs\">{{ log }}</li>\n" +
    "        </ul>\n" +
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
    "    <ul class=\"clearfix\">\n" +
    "        <li ng-repeat=\"card in homePlayer.hasCards\" class=\"pull-left\">\n" +
    "            <div poker-game-card card-id=\"card.id\" ></div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" \n" +
    "        ng-disabled=\"selectedCards.length == 0 || !homePlayer.isCurrentPlayer\"\n" +
    "        ng-click=\"playCards()\">\n" +
    "        Play Cards\n" +
    "    </button>\n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGamePlayerListPartial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGamePlayerListPartial.html",
    "<div ng-controller=\"pokerGamePlayerListController\" class=\"player-list\">\n" +
    "    This is player list\n" +
    "    <ul class=\"clearfix\">\n" +
    "        <li ng-repeat=\"player in pokerGamePlayerListModal.getPlayers()\" class=\"pull-left\">\n" +
    "            <div poker-game-player\n" +
    "                player-id=\"player.id\"\n" +
    "                is-current-player=\"player.isCurrentPlayer\"></div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>");
}]);

angular.module("pokerGamePlayerTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGamePlayerTemplate.html",
    "<div class=\"poker-game-player\">\n" +
    "\n" +
    "    <div class=\"current-player-arrow\" ng-class=\"{ 'active': isCurrentPlayer }\">\n" +
    "        <span class=\"icon-arrow-down\"></span>\n" +
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
