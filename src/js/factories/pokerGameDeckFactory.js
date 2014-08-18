/**
 * @fileoverview The deck modal service
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    pokerGameKindEnum) {

    var PokerGameDeckFactory = function (deckConfig) {

        angular.extend(this, {

            // Kinds of cards in different suits
            // Order in array doesn't matter
            spadeCards: [],

            heartCards: [],

            clubCards: [],

            diamondCards: [],

            jokerCards: []

        }, deckConfig);

    };

    PokerGameDeckFactory.prototype = {

        

    };

    return PokerGameDeckFactory;

};