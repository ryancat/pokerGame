/**
 * @fileOverview The player directive
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    PokerGamePlayerFactory,
    pokerGameCardTableModal,
    pokerGamePlayerListModal) {

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

                player: pokerGamePlayerListModal.getPlayerById(scope.playerId),

            });

            console.log(scope);

            /**
             * Watch on the change of cards playing
             */
            scope.$watch('pokerGameCardTableModal.cardsPlaying.length', function (newLength, oldLength) {

                var newCards,
                    currentPlayer;

                if (angular.isUndefined(newLength)) {
                    $log.warn('Invalid newLength');
                    return ;
                }

                // When a player played a new card
                if (newLength > oldLength) {
                    newCards = pokerGameCardTableModal.getLatestPlayingCards();
                }

            });

        }

    };

};