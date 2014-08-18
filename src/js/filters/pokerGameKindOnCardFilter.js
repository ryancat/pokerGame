/**
 * @fileoverview The filter for showing right kind format on card
 * @ngInject
 * @author rchen
 */

// global: _, module

module.exports = function ($log, pokerGameKindEnum) {

    return function (kind) {
        if (!pokerGameKindEnum.has(kind)) {
            $log.warn('Invalid kind');
            return ;
        }

        if (pokerGameKindEnum.isJoker(kind)) {
            return 'Joker';
        } else {
            return kind;
        }
    };

};

