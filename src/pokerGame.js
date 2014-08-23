angular
.module('pokerGame', ['pokerGameTemplate'])
.value('pokerGameOptions', {

	// ...
	
})

.filter('pokerGameKindOnCardFilter', require('./js/filters/pokerGameKindOnCardFilter'))

.controller('pokerGamePlayerListController', require('./js/controllers/pokerGamePlayerListController'))
.controller('pokerGameCardTableController', require('./js/controllers/pokerGameCardTableController'))
.controller('pokerGameMyCardsController', require('./js/controllers/pokerGameMyCardsController'))
.controller('pokerGameGameLogController', require('./js/controllers/pokerGameGameLogController'))

.factory('PokerGameCardFactory', require('./js/factories/pokerGameCardFactory'))
.factory('PokerGameDeckFactory', require('./js/factories/pokerGameDeckFactory'))
.factory('PokerGamePlayerFactory', require('./js/factories/pokerGamePlayerFactory'))

.service('pokerGameSuitEnum', require('./js/services/pokerGameSuitEnumService'))
.service('pokerGameKindEnum', require('./js/services/pokerGameKindEnumService'))
.service('pokerGameSpeedEnum', require('./js/services/pokerGameSpeedEnumService'))
.service('pokerGameCardsNumberEnum', require('./js/services/pokerGameCardsNumberEnumService'))
.service('pokerGameMyCardsModal', require('./js/services/pokerGameMyCardsModalService'))
.service('pokerGamePlayerListModal', require('./js/services/pokerGamePlayerListModalService'))
.service('pokerGameCardTableModal', require('./js/services/pokerGameCardTableModalService'))
.service('pokerGameUtil', require('./js/services/pokerGameUtilService'))

.directive('pokerGameCard', require('./js/directives/pokerGameCardDirective'))
.directive('pokerGamePlayer', require('./js/directives/pokerGamePlayerDirective'))
.directive('pokerGame', function () {

	return {
		restrict: '',
		scope: {

			// ...
			
		},
		templateUrl: 'pokerGame.html',
		link: function (scope, element) {

			angular.extend(scope, {

				// ...

			});

			// teardown
			scope.$on('$destroy', function(){});

		}
	};

});