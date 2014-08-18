/**
 * @fileOverview The controller for my card section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $scope,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameMyCardsModal) {

    angular.extend($scope, {

        suit: pokerGameSuitEnum.getRandomSuit(),

        kind: pokerGameKindEnum.getRandomKind()

    });

};