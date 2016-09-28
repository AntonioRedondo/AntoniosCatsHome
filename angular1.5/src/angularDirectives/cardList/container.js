angular
	.module("ach")

	.directive("cardList", ["$achQueries", function($achQueries) {
		return {
			restrict: "E",
			templateUrl: "angularDirectives/cardList/card.tpl.htm",
			scope: {},
			link: function(scope) {
				$achQueries.cards().then(function(results) {
					scope.cards = results.sort(function(a, b) {
						if (a.name < b.name)
							return -1;
						if (a.name > b.name)
							return 1;
						else return 0;
					});
					scope.cardsOriginal = scope.cards;
				}, function(e) {
					console.debug(e);
				});

				scope.cardSelected = -1;
				scope.cardClicked = function($index) {
					if ($index === scope.cardSelected)
						scope.cardSelected = -1;
					else scope.cardSelected = $index;
				};
				
				scope.filter = function() {
					scope.cards = scope.cardsOriginal.filter(function(item) {
						var itemKeys = Object.keys(item);
						for (var n=0; n<itemKeys.length; ++n)
							if (item[itemKeys[n]] && item[itemKeys[n]].toLowerCase().indexOf(scope.filterString.toLowerCase()) > -1)
								return true;
						return false;
					});
				};
			}
		};
	}]);
