/**
 * @fileOverview Some util functions
 * @ngInject
 * @author rchen
 */

module.exports = function () {

    var api = {

        makeRandomId: function (idLength){

            var text = '',
                possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                i;

            idLength = angular.isNumber(idLength) ? idLength : 5;

            for( i = 0; i < idLength; i += 1 ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;

        }

    };

    return api;
};