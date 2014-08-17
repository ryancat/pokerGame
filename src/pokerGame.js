angular
.module('turn/pokergame', ['pokergameTemplate'])
.value('pokergameOptions', {

	// ...
	
})
.directive('pokergame', function () {

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