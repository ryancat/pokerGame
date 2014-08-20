/**
 * @fileOverview The controller for my card section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    $scope,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGamePlayerListModal,
    pokerGameCardTableModal) {

    angular.extend($scope, {

        homePlayer: pokerGamePlayerListModal.getHomePlayer(),

        selectedCards: [],

        init: function () {

        },
        /**
         * Play the selected cards
         */
        playCards: function () {

            var cardsToPlay = _.filter($scope.homePlayer.hasCards, 'isSelected');
            
            cardsToPlay.forEach(function (card) {
                card.isPlayed = true;
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
            return ;
        }

        $scope.selectedCards = _.filter(cards, 'isSelected');

    }, true);

};