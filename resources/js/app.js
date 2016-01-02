var pocketBetaApp = angular.module('pocketBetaApp', [
	'ui.router',
	'ngMaterial',
	'firebase'
]);

pocketBetaApp.config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
}])
.config(['$stateProvider', function ($stateProvider) {

	$stateProvider
	// app homepage
	.state('home', {
		url: '/',
		templateUrl: '/views/home.html',
		controller: 'homeCtrl'
	})
	// app
	.state('app', {
		url: '/app',
		templateUrl: 'app.html', // doesn't exist yet
		controller: 'appCtrl' // doesn't exist yet
	})
	// form to enter climbing info
	.state('climbForm', {
		url: '/climb-form/:slug',
		templateUrl: '/views/climb-form.html',
		controller: 'climbFormCtrl'
	});

}]);