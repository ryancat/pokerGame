/**
 * @fileoverview The limit on number of cards played per round
 * @ngInject
 * @author rchen
 */

// global: _, module

module.exports = function () {

    var pokerGameCardsNumberEnum = Object.freeze({
        NO_LIMIT: '0',
        SAME: '1'
    });

    angular.extend(this, {

        // API
        // getters
        NO_LIMIT: pokerGameCardsNumberEnum.NO_LIMIT,
        SAME: pokerGameCardsNumberEnum.SAME

    });

};

