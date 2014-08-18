/**
 * @fileOverview The controller for card table section
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