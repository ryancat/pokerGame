/**
 * @fileoverview The player modal service
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log) {

    var PokerGamePlayer = function (playerConfig) {

        angular.extend(this, {

            id: '',
            name: '',
            score: 0,
            hasCards: [],
            playOrder: 1,

        }, playerConfig);

    };

    PokerGameCard.prototype = {

        

    };

    return PokerGameCard;

};