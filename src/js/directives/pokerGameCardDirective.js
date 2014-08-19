/**
 * @fileOverview The card directive
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    PokerGameCardFactory,
    pokerGameSuitEnum,
    pokerGameKindEnum) {

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