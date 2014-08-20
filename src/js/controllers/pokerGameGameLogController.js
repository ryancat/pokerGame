/**
 * @fileOverview The controller for game log section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $scope,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameCardTableModal,
    pokerGamePlayerListModal) {

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

        var newCards,
            playerId,
            player;

        if (angular.isUndefined(newLength)) {
            $log.warn('Invalid newLength');
            return ;
        }

        // When a player played a new card
        if (newLength > oldLength) {
            newCards = pokerGameCardTableModal.getLatestPlayingCards();

            // When someone played no cards
            if (newCards.length === 0) {
                $scope.logs.push('Someone played no cards');
                return ;
            }

            playerId = newCards[0].belongsToPlayerId;
            player = pokerGamePlayerListModal.getPlayerById(playerId);

            $scope.logs.push(player.name + ' played ' + newCards.map(function (card) {
                return card.suit + ' ' + card.kind;
            }).join(', '));
        }   

    });

};