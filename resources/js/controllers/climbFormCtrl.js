angular.module('pocketBetaApp')
.controller('climbFormCtrl', ['$scope', 'pocketBetaApp.api', '$stateParams', '$mdDialog', '$mdMedia', function ($scope, Api, $stateParams, $mdDialog, $mdMedia) {

	$scope.selectedSector = {};
	$scope.selectedClimb = {};

	$scope.meta = {
		pageTitle:'Form',
		description:'This is a form'
	};

	$scope.climbTypes = ['', 'bouldering', 'sport', 'trad'];


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
			$scope.crag = Api.crag($scope.cragSlug);
		});
	})();

	$scope.newSectorModal = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

		$scope.newSector = {
			name:'',
			description:''
		};

		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'views/modals/new-sector.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		})
		.then(function(newSectorData) {
			console.log(newSectorData);
		}, function() {
			console.log('close modal');
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};

	$scope.newClimbModal = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

		$scope.newClimb = {
			name:'',
			climbType:'',
			grade:'',
			rockName:'',
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

		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'views/modals/new-climb.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		})
		.then(function(newClimbData) {
			console.log(newClimbData);
		}, function() {
			console.log('close modal');
		});

		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};


	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.newClimbData = function(newClimbData) {
			$mdDialog.hide(newClimbData);
		};
		$scope.newSectorData = function(newSectorData) {
			$mdDialog.hide(newSectorData);
		};
	}
}]);