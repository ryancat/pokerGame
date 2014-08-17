/**
 * @fileoverview The card suit enum
 * @ngInject
 * @author rchen
 */

// global: _, module

module.exports = function () {

    var pokerGameSuitEnum = Object.freeze({
        SPADE: 'spade',
        HEART: 'heart',
        CLUB: 'club',
        DIAMOND: 'diamond',
    });

    angular.extend(this, {

        // API
        // getters
        SPADE: pokerGameSuitEnum.SPADE,
        HEART: pokerGameSuitEnum.HEART,
        CLUB: pokerGameSuitEnum.CLUB,
        DIAMOND: pokerGameSuitEnum.DIAMOND,

        has: function (suit) {
            return _.values(pokerGameSuitEnum).indexOf(suit) >= 0;
        },


    });

};