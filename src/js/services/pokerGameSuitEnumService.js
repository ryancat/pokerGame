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
        /**
         * Check if the given suit is valid enum item
         */
        has: function (suit) {

            return _.values(pokerGameSuitEnum).indexOf(suit) >= 0;

        },
        /**
         * Get a random suit
         */
        getRandomSuit: function () {

            var enumKeys = _.keys(pokerGameSuitEnum),
                enumKeysLength = enumKeys.length;

            return pokerGameSuitEnum[enumKeys[_.random(0, enumKeysLength - 1)]];

        }

    });

};