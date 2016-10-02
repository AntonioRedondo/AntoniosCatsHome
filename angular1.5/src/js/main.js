"use strict";

angular
	.module("ach", ["ngAnimate", "ui.router"])
	
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state("Cats", {
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
		// console.log("hello");
	}]);
