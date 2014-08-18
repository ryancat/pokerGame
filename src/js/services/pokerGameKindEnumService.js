/**
 * @fileoverview The card deck enum
 * @ngInject
 * @author rchen
 */

// global: _, module

module.exports = function () {

    var pokerGameKindEnum = Object.freeze({
        ACE: '1',
        TWO: '2',
        THREE: '3',
        FOUR: '4',
        FIVE: '5',
        SIX: '6',
        SEVEN: '7',
        EIGHT: '8',
        NINE: '9',
        TEN: '10',
        JACK: 'J',
        QUEEN: 'Q',
        KING: 'K',
        JOKER_RED: 'R Joker',
        JOKER_BLACK: 'B Joker'
    });

    angular.extend(this, {

        // API
        // getters
        ACE: pokerGameKindEnum.Ace,
        TWO: pokerGameKindEnum.TWO,
        THREE: pokerGameKindEnum.THREE,
        FOUR: pokerGameKindEnum.FOUR,
        FIVE: pokerGameKindEnum.FIVE,
        SIX: pokerGameKindEnum.SIX,
        SEVEN: pokerGameKindEnum.SEVEN,
        EIGHT: pokerGameKindEnum.EIGHT,
        NINE: pokerGameKindEnum.NINE,
        TEN: pokerGameKindEnum.TEN,
        JACK: pokerGameKindEnum.JACK,
        QUEEN: pokerGameKindEnum.QUEEN,
        KING: pokerGameKindEnum.KING,
        JOKER_RED: pokerGameKindEnum.JOKER_RED,
        JOKER_BLACK: pokerGameKindEnum.JOKER_BLACK,

        has: function (kind) {
            return _.values(pokerGameKindEnum).indexOf(kind) >= 0;
        },
        /**
         * Get a random kind of card
         */
        getRandomKind: function () {

            var enumKeys = _.keys(pokerGameKindEnum),
                enumKeysLength = enumKeys.length;

            return pokerGameKindEnum[enumKeys[_.random(0, enumKeysLength - 1)]];

        },
        isJoker: function (kind) {

            return kind === pokerGameKindEnum.JOKER_BLACK ||
                kind === pokerGameKindEnum.JOKER_RED;

        }

    });

};

