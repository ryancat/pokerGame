/**
 * @fileOverview The controller for game log section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $scope,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameCardTableModal) {

    angular.extend($scope, {

        suit: pokerGameSuitEnum.getRandomSuit(),

        kind: pokerGameKindEnum.getRandomKind()

    });

};