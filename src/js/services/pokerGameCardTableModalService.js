/**
 * @fileOverview The card table section data modal
 * @ngInject
 * @author rchen
 */

module.exports = function (
    pokerGameSuitEnum,
    PokerGameCardFactory) {

    /**
     * Cards to draw in array of poker cards
     */
    var cardsToDraw = [],
        /**
         * Cards played in array of arries
         * @example
         * [
         *     [PokerGameCard1],
         *     [PokerGameCard1, PokerGameCard2]
         * ]
         */
        cardsPlayed = [],
        /**
         * Cards playing in array of arries
         * @example
         * [
         *     [PokerGameCard1],
         *     [PokerGameCard1, PokerGameCard2]
         * ]
         */
        cardsPlaying = [];

    angular.extend(this, {

        /**
         * Get the latest playing cards from cardsPlaying
         */
        getLatestPlayingCards: function () {

            return _.last(cardsPlaying);

        },
        /**
         * Shuffle the cards, and setup the cards to draw
         */
        setCardsToDraw: function (deck) {

            cardsToDraw = _
            // Shuffle the given cards
            .shuffle(
                // Merge each suit cards to one array
                _.flatten(
                    // For each suit, mutate the kind to actual cards
                    _.keys(deck).map(function (suit) {

                        var pokerCardsBySuit = [];

                        if (pokerGameSuitEnum.has(suit)) {
                            pokerCardsBySuit = deck[suit].map(function (kind) {
                                return new PokerGameCardFactory({
                                    suit: suit,
                                    kind: kind
                                });
                            });
                        }

                        return pokerCardsBySuit;

            })));

        },

        getCardsToDraw: function () {

            return cardsToDraw;

        },

        getNumberOfCardsToDraw: function () {

            return cardsToDraw.length;

        }

    });

};