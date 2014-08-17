angular
.module('pokerGame', ['pokerGameTemplate'])
.value('pokerGameOptions', {

	// ...
	
})

.factory('PokerGameCard', require('./js/factories/pokerGameCardFactory'))
.factory('PokerGameDeck', require('./js/factories/pokerGameDeckFactory'))
.factory('PokerGamePlayer', require('./js/factories/pokerGamePlayerFactory'))

.directive('pokerGameCard', require('./js/directive/pokerGameCardDirective'))

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