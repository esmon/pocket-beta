angular.module('pocketBetaApp')
.controller('climbEnterFormCtrl', ['$scope', 'pocketBetaApp.api', function ($scope, Api) {

	$scope.selectedSector = {};
	$scope.selectedClimb = {};

	$scope.meta = {
		pageTitle:'Form',
		description:'This is a form'
	};

	$scope.newClimb = {
		name:'',
		climbType:'',
		grade:'',
		boulderName:'',
		image:'',
		description:'',
		topOut:'',
		start:'',
		restrictions:'',
		badLanding:'',
		gps:{
			'lat':'',
			'lon':''
		},
		rating:null
	};

	$scope.isEmptyObject = function(obj) {
		return Object.keys(obj).length; 
	};

	(function init(){
		Api.initialize().then(function(){
			$scope.crag = Api.crags();
			$scope.sectors = Api.sectors();

			console.log($scope.crag);
		});
	})();
}])
.config(function($mdThemingProvider) {
	// Configure a dark theme with primary foreground yellow
	$mdThemingProvider.theme('sector-dark', 'default')
		.primaryPalette('yellow')
		.dark();
});