/**
 * @fileOverview The controller for player list section
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $scope,
    $log,
    pokerGamePlayerListModal) {

    angular.extend($scope, {

        pokerGamePlayerListModal: pokerGamePlayerListModal,

        init: function () {

            var playerConfig = $scope.playerConfig || {};

            pokerGamePlayerListModal.setPlayers(playerConfig.players);
            
        }

    });

    $scope.init();

};