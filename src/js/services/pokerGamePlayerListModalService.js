/**
 * @fileOverview The player list section data modal
 * @ngInject
 * @author rchen
 */

// Global: _, module

module.exports = function (
    $log,
    PokerGamePlayerFactory) {

    var players = [];

    angular.extend(this, {

        getPlayers: function () {
            return players;
        },

        setPlayers: function (playerList) {

            if (!angular.isArray(playerList)) {
                $log.warn('Invalid playerList');
                return ;
            }

            this.resetPlayers();

            playerList.forEach(function (player) {

                players.push(new PokerGamePlayerFactory(player));

            });
        },

        resetPlayers: function () {

            players.length = 0;

        }

    });

};