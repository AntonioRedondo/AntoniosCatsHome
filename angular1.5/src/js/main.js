"use strict";

angular
	.module("ach", ["ngAnimate", "ui.router"])
	
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state("cats", {
				url: "/",
				templateUrl: "angularTpl/cats.tpl.htm",
				controller: "listController"
			})
			.state("how-to-adopt", {
				url: "/how-to-adopt",
				templateUrl: "angularTpl/howToAdopt.tpl.htm",
				controller: "listController"
			});
	}])
	
	.controller("listController", ["$scope", "$stateParams", function($scope, $stateParams) {
		// console.log("hello");
	}]);
