/**
 * @fileoverview The card modal service
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    pokerGameSuitEnum) {

    var PokerGameCard = function (cardConfig) {

        /**
         * @public
         */
        angular.extend(this, {

            /**
             * one of the four suit enum
             * [ 'SPADE', 'HEART', 'CLUB', 'DIAMOND' ]
             */
            suit: pokerGameSuitEnum.SPADE,
            /**
             * one of the (13 + jokers) kinds of poker cards kind enum
             */
            kind: pokerGameKindEnum.ACE,
            /**
             * boolean value of if this card has been played
             */
            isPlayed: false,
            /**
             * one of the player
             */
            belongsToPlayer: undefined

        }, cardConfig);

    };

    PokerGameCard.prototype = {

            setSuit: function (suit) {

                if (!pokerGameSuitEnum.has(suit)) {
                    $log.warn('Invalid suit');
                    return ;
                }

                _suit = suit;

            },

            getSuit: function () {

                return _suit;

            }

    };

    return PokerGameCard;

};