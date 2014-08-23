/**
 * @fileoverview The play speed enum
 * @ngInject
 * @author rchen
 */

// global: _, module

module.exports = function () {

    var pokerGameSpeedEnum = Object.freeze({
        ALWAYS_WAIT: '0',
        SLOW: '1',
        NORMAL: '2',
        FAST: '3'
    });

    angular.extend(this, {

        // API
        // getters
        ALWAYS_WAIT: pokerGameSpeedEnum.ALWAYS_WAIT,
        SLOW: pokerGameSpeedEnum.SLOW,
        NORMAL: pokerGameSpeedEnum.NORMAL,
        FAST: pokerGameSpeedEnum.FAST,

        getTimeoutMiliseconds: function (speed) {

            switch (speed) {
                case pokerGameSpeedEnum.ALWAYS_WAIT:
                    // Meaning we are waiting forever
                    return -1;

                case pokerGameSpeedEnum.SLOW:
                    // Wait for one hour
                    return 60000;

                case pokerGameSpeedEnum.NORMAL:
                    return 10000;

                case pokerGameSpeedEnum.FAST:
                    return 6000;

                default:
                    return 10000;
            }

        }

    });

};

