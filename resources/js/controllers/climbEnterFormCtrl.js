angular.module('pocketBetaApp')
.controller('climbEnterFormCtrl', ['$scope', 'pocketBetaApp.api', '$stateParams', function ($scope, Api, $stateParams) {

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
		// camel case function
		function camelCase(input) { 
			return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
				return group1.toUpperCase();
			});
		}
		// url slug camelcase to find object in crags
		$scope.cragSlug = camelCase($stateParams.slug);

		Api.initialize().then(function(){

			$scope.crag = Api.crags($scope.cragSlug);
			$scope.sectors = Api.sectors();
		});
	})();
}])
.config(function($mdThemingProvider) {
	// Configure a dark theme with primary foreground yellow
	$mdThemingProvider.theme('sector-dark', 'default')
		.primaryPalette('yellow')
		.dark();
});