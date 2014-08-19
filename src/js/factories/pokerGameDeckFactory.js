/**
 * @fileoverview The deck modal service
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    pokerGameSuitEnum) {

    var PokerGameDeckFactory = function (deckConfig) {

        // Kinds of cards in different suits
        // Order in array doesn't matter
        this[pokerGameSuitEnum.SPADE] = [];
        this[pokerGameSuitEnum.HEART] = [];
        this[pokerGameSuitEnum.CLUB] = [];
        this[pokerGameSuitEnum.DIAMOND] = [];
        this[pokerGameSuitEnum.JOKER] = [];

        angular.extend(this, deckConfig);

    };

    PokerGameDeckFactory.prototype = {

        

    };

    return PokerGameDeckFactory;

};