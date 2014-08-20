/**
 * @fileOverview The my cards section data modal
 * @ngInject
 * @author rchen
 */

module.exports = function (
    $log,
    pokerGamePlayerListModal) {

    var myCards = [];

    angular.extend(this, {

        // toggleSelectedCardById: function (cardId) {

        //     var selectedCard = _.find(myCards, function (card) {
        //         return card.id === cardId;
        //     });

        //     if (angular.isUndefined(selectedCard)) {
        //         $log.warn('Invalid cardId');
        //         return ;
        //     }

        //     selectedCard.isSelected

        // },

        setMyCards: function (cards) {

            if (!angular.isArray(cards)) {
                $log.warn('Invalid cards');
                return ;
            }

            this.resetMyCards();
            Array.prototype.push.apply(myCards, cards);

        },

        resetMyCards: function () {

            myCards.length = 0;

        }

    });

};