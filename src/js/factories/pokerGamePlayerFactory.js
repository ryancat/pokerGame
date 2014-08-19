/**
 * @fileoverview The player modal service
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log) {

    var PokerGamePlayerFactory = function (playerConfig) {

        angular.extend(this, {

            id: '',
            name: '',
            score: 0,
            hasCards: [],
            playOrder: 1,
            isCurrentPlayer: false

        }, playerConfig);

    };

    PokerGamePlayerFactory.prototype = {

        

    };

    return PokerGamePlayerFactory;

};