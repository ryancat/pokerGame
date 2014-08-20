/**
 * @fileoverview The card modal service
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    pokerGameSuitEnum,
    pokerGameKindEnum,
    pokerGameUtil) {

    var PokerGameCardFactory = function (cardConfig) {

        /**
         * @public
         */
        angular.extend(this, {

            id: pokerGameUtil.makeRandomId(),
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

            isSelected: false,
            /**
             * one of the player
             */
            belongsToPlayerId: undefined

        }, cardConfig);

    };

    PokerGameCardFactory.prototype = {

            setSuit: function (suit) {

                if (!pokerGameSuitEnum.has(suit)) {
                    $log.warn('Invalid suit');
                    return ;
                }

                _suit = suit;

            },

            getSuit: function () {

                return _suit;

            },


            isRedCard: function () {
                return this.suit === pokerGameSuitEnum.HEART || 
                this.suit === pokerGameSuitEnum.DIAMOND ||
                this.kind === pokerGameKindEnum.JOKER_RED;
            },

            isBlackCard: function () {
                return this.suit === pokerGameSuitEnum.SPADE || 
                this.suit === pokerGameSuitEnum.CLUB ||
                this.kind === pokerGameKindEnum.JOKER_BLACK;
            },
            /**
             * Check if the given card is joker card
             */
            isJoker: function () {

                return pokerGameKindEnum.isJoker(this.kind);

            }


    };

    return PokerGameCardFactory;

};