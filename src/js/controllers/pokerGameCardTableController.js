/**
 * @fileOverview The controller for card table section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $scope,
    $log,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameCardTableModal,
    pokerGamePlayerListModal) {

    angular.extend($scope, {

        deckConfig: $scope.deckConfig,

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

            // $scope.players = players;
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
    $scope.$watch('pokerGameCardTableModal.getCardsPlaying().length', function (newLength, oldLength) {

        var newCards,
            playerId;

        if (angular.isUndefined(newLength)) {
            $log.warn('Invalid newLength');
            return ;
        }

        // When a player played a new card
        if (newLength > oldLength) {
            newCards = pokerGameCardTableModal.getLatestPlayingCards();
            
            // When someone played no cards
            if (newCards.length === 0) {
                return ;
            }

            playerId = newCards[0].belongsToPlayerId;

            $scope.cardsPlayingStatus[playerId] = newCards;
        }   

    });

    // setInterval(function () {
    //     $log.log('Some cards are playing', pokerGameCardTableModal.cardsPlaying);
    // }, 1000);

};