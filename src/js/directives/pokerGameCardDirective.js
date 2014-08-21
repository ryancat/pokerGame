/**
 * @fileOverview The card directive
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    PokerGameCardFactory,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameCardTableModal) {

    return {

        restrict: 'EA',
        scope: {
            cardId: '='
        },
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
                /**
                 * Select the current card
                 */
                toggleSelectCard: function () {

                    if (scope.card.isPlaying) {
                        $log.warn('Played cards cannot be selected');
                        return ;
                    }

                    scope.card.isSelected = !scope.card.isSelected;

                }

            });

            console.log(scope, scope.isJoker());

        }

    };

};