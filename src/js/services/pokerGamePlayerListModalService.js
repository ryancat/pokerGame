/**
 * @fileOverview The player list section data modal
 * @ngInject
 * @author rchen
 */

// Global: _, module

module.exports = function (
    $log,
    PokerGamePlayerFactory,
    pokerGameUtil) {

    var players = [];

    angular.extend(this, {

        getPlayers: function () {
            return players;
        },

        setPlayers: function (playerList) {

            var playerOrders;

            if (!angular.isArray(playerList)) {
                $log.warn('Invalid playerList');
                return ;
            }

            orderedPlayers = _.sortBy(playerList, 'order');


            this.resetPlayers();
            orderedPlayers.forEach(function (player, playerIndex) {
                player.id = pokerGameUtil.makeRandomId();
                player.nextPlayerId = orderedPlayers[(playerIndex + 1) % orderedPlayers.length].id;
                players.push(new PokerGamePlayerFactory(player));

            });
        },

        resetPlayers: function () {

            players.length = 0;

        },

        getNumberOfPlayers: function () {

            return players.length;

        },

        getPlayerById: function (playerId) {

            return _.find(players, function (player) {
                return player.id === playerId;
            });

        },

        getCurrentPlayer: function () {

            return _.find(players, function (player) {
                return player.isCurrentPlayer;
            });

        },
        /**
         * Set the given player to 'my player'
         */
        setHomePlayerById: function (playerId) {

            var player = this.getPlayerById(playerid);

            if (angular.isUndefined(player)) {
                $log.warn('Invalid playerId');
                return ;
            }

            this.resetHomePlayer();
            player.isHomePlayer = true;

        },  
        /**
         * Clean all home player
         */
        resetHomePlayer: function () {

            players.forEach(function (player) {

                player.isHomePlayer = false;

            });

        },
        /**
         * Get the home player ('my player')
         */
        getHomePlayer: function () {

            return _.find(players, function (player) {
                return player.isHomePlayer;
            });

        }

    });

};
