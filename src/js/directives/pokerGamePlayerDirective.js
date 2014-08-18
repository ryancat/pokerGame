/**
 * @fileOverview The player directive
 * @ngInject
 * @author rchen
 */

module.exports = function (
    pokerGameSuitEnum,
    pokerGameKindEnum,
    PokerGamePlayerFactory) {

    return {

        restrict: 'EA',
        scope: {
            playerName: '=',
            playerId: '='
        },
        templateUrl: 'pokerGamePlayerTemplate.html',
        link: function (scope, element) {

            angular.extend(scope, {

                player: new PokerGamePlayerFactory({
                    name: scope.playerName,
                    id: scope.playerId
                }),

                isCurrentPlayer: false

            });

        }

    };

};