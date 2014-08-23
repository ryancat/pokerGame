/**
 * @fileOverview The controller for card table section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $scope,
    $log,
    $q,
    $timeout,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameSpeedEnum,
    pokerGameCardsNumberEnum,
    pokerGameCardTableModal,
    pokerGamePlayerListModal) {

    angular.extend($scope, {

        pokerGameCardTableModal: pokerGameCardTableModal,

        pokerGamePlayerListModal: pokerGamePlayerListModal,

        finishedDealCard: false,

        cardsPlayingStatus: {},

        players: pokerGamePlayerListModal.getPlayers(),

        // players: [],

        // cards: [],

        init: function () {

            pokerGameCardTableModal.setCardsToDrawByDeck($scope.deckConfig.deck);

        },  
        /**
         * Deal the cards to each player
         */
        dealCards: function () {

            var players = pokerGamePlayerListModal.getPlayers(),
                cards = pokerGameCardTableModal.getCardsToDraw(),
                numOfCards = cards.length,
                numOfPlayers = players.length,
                numOfCardsPerPlayer = numOfPlayers ? numOfCards / numOfPlayers : -1;

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
        /**
         * Wait for player to play card
         * User can set timeout speed in rule config
         */
        waitForPlayer: function () {

            var deferred = $q.defer(),
                playSpeed = $scope.ruleConfig.playSpeed,
                timeout = pokerGameSpeedEnum.getTimeoutMiliseconds(playSpeed);

            if (playSpeed === pokerGameSpeedEnum.ALWAYS_WAIT) {
                return ;
            }

            $scope.playTimeout = $timeout($scope.switchToNextPlayer, timeout);

        },
        /**
         * Find the next player and switch to it
         * Also assume the current player either
         * play nothing or
         * play the same number of cards, following the rule
         * Depend on the rule
         */
        switchToNextPlayer: function () {

            // Set the next player to be the current player
            var nextPlayer = pokerGamePlayerListModal.getNextPlayer();
            pokerGamePlayerListModal.setCurrentPlayer(nextPlayer);
            // Wait for the current player play
            $scope.waitForPlayer();
        },
        /**
         * After someone played cards, this function will handle
         * the player switch logic
         */
        handlePlayingCards: function () {

            var newCards = pokerGameCardTableModal.getLatestPlayingCards(),
                playerId;
            
            // When someone played no cards
            if (newCards.length === 0) {
                return ;
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
            return ;
        }

        // When a player played a new card
        if (newLength > oldLength) {
            $scope.handlePlayingCards();
        }   

    });

    // setInterval(function () {
    //     $log.log('Some cards are playing', pokerGameCardTableModal.cardsPlaying);
    // }, 1000);

};