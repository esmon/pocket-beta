angular.module('pocketBetaApp').controller('climbEnterFormCtrl', ['$scope', 'pocketBetaApp.api', function ($scope, Api) {
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
		bl:''
	};

	(function init(){
		Api.initialize().then(function(){
			$scope.sectors = Api.sectors();
		});
	})();
}])
.config(function($mdThemingProvider) {
	// Configure a dark theme with primary foreground yellow
	$mdThemingProvider.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark();
});