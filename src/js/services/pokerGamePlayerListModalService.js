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

            var numOfPlayer,
                orderedPlayers;

            if (!angular.isArray(playerList)) {
                $log.warn('Invalid playerList');
                return ;
            }

            numOfPlayer = playerList.length;
            orderedPlayers = _.sortBy(playerList, 'playOrder');
            this.resetPlayers();

            // Initialize the random id
            orderedPlayers.forEach(function (player, playerIndex) {

                player.id = pokerGameUtil.makeRandomId();

            });

            // Set the next player id, and create player
            orderedPlayers.forEach(function (player, playerIndex) {

                player.nextPlayerId = orderedPlayers[(playerIndex + 1) % numOfPlayer].id;
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
        // Set the given player to be the current player
        setCurrentPlayer: function (player) {

            if (!(player instanceof PokerGamePlayerFactory)) {
                $log.warn('Invalid player');
                return ;
            }

            players.forEach(function (p) {

                p.isCurrentPlayer = false;

            });

            player.isCurrentPlayer = true;

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

        },
        /**
         * Get the first player by order
         */
        getFirstPlayer: function () {

            var orderedPlayers = _.sortBy(players, 'playOrder');

            if (orderedPlayers.length === 0) {
                $log.warn('Invalid players number');
                return ;
            }

            return orderedPlayers[0];

        },
        /**
         * Get the next player based on current player
         * If there is no current player, set the next player to the
         * first player
         * Then set the next player to be the new current player
         */
        getNextPlayer: function () {

            var currentPlayer = this.getCurrentPlayer(),
                nextPlayerId,
                nextPlayer;

            // If there is no current player 
            // We will set the first player to be the current player   
            if (angular.isUndefined(currentPlayer)) {
                return this.getFirstPlayer();
            }

            nextPlayerId = currentPlayer.nextPlayerId;

            nextPlayer =  _.find(players, function (player) {
                return player.id === nextPlayerId;
            });

            if (angular.isUndefined(nextPlayer)) {
                $log.warn('Invalid next player');
                return ;
            }

            return nextPlayer;

        }

    });

};
