"use strict";

angular
	.module("ach", ["ui.router"])
	
	.config(["$stateProvider", function($stateProvider) {
		$stateProvider
			.state("Home", {
				url: "/",
				templateUrl: "angularTpl/cats.tpl.htm",
				controller: "listController"
			})
			.state("HowToAdopt", {
				url: "/how-to-adopt",
				templateUrl: "angularTpl/howToAdopt.tpl.htm",
				controller: "listController"
			});
	}])
	
	.controller("listController", ["$scope", "$stateParams", function($scope, $stateParams) {
		console.log("hello");
	}]);
