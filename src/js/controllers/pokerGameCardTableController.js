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

        finishedDealCard: false,

        players: [],

        cards: [],

        init: function () {

            pokerGameCardTableModal.setCardsToDraw($scope.deckConfig.deck);

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
            return ;
        }

        // When a player played a new card
        if (newLength > oldLength) {
            newCards = pokerGameCardTableModal.getLatestPlayingCards();

        }

    });

    $log.log('The poker card table modal', pokerGameCardTableModal.getCardsToDraw());
    $log.log('The players modal', pokerGamePlayerListModal.getPlayers());

};