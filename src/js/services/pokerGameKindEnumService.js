/**
 * @fileoverview The card deck enum
 * @ngInject
 * @author rchen
 */

// global: _, module

module.exports = function () {

    var pokerGameSuitEnum = Object.freeze({
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
        JACK: '11',
        QUEEN: '12',
        KING: '13',
        JOKER_RED: 'red joker',
        JOKER_BLACK: 'black joker'
    });

    angular.extend(this, {

        // API
        // getters
        ACE: pokerGameSuitEnum.Ace,
        TWO: pokerGameSuitEnum.TWO,
        THREE: pokerGameSuitEnum.THREE,
        FOUR: pokerGameSuitEnum.FOUR,
        FIVE: pokerGameSuitEnum.FIVE,
        SIX: pokerGameSuitEnum.SIX,
        SEVEN: pokerGameSuitEnum.SEVEN,
        EIGHT: pokerGameSuitEnum.EIGHT,
        NINE: pokerGameSuitEnum.NINE,
        TEN: pokerGameSuitEnum.TEN,
        JACK: pokerGameSuitEnum.JACK,
        QUEEN: pokerGameSuitEnum.QUEEN,
        KING: pokerGameSuitEnum.KING,
        JOKER_RED: pokerGameSuitEnum.JOKER_RED,
        JOKER_BLACK: pokerGameSuitEnum.JOKER_BLACK,

        has: function (suit) {
            return _.values(pokerGameSuitEnum).indexOf(suit) >= 0;
        }

        

    });

};

