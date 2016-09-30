angular
	.module("ach")
	
	// Angular built-in filters are used. For pure JS filters check the Vanilla JS implementation
	.directive("cardList", ["$achQueries", "orderByFilter", "filterFilter", function($achQueries, $orderByFilter, $filterFilter) {
		return {
			restrict: "E",
			templateUrl: "angularDirectives/cardList/card.tpl.htm",
			scope: {}, // Isolated scope
			link: function(scope) {
				$achQueries.cards().then(function(results) {
					scope.cardsOriginal = $orderByFilter(results, "name");
					scope.cards = scope.cardsOriginal;
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
					scope.cards = $filterFilter(scope.cardsOriginal, scope.filterString);
				};
			}
		};
	}]);
