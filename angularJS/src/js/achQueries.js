angular
	.module("ach")

	.factory("$achQueries", ["$http", function ($http) {
		return {
			cards: function() {
				return $http.get("data/cats.json").then(function(result) { return result.data; });
			}
		};
	}]);
