angular.module('pocketBetaApp')
.factory('Api', ['$firebaseObject', '$q', function($firebaseObject, $q){

	'use strict';

	var data,
		crag;

	var service = {
		initialize: function(){
			var deferred = $q.defer();
			var ref = new Firebase('https://pocket-beta-staging.firebaseio.com');
			data = $firebaseObject(ref);

			data.$loaded()
			.then(function() {
				deferred.resolve();
			})
			.catch(function(err) {
				console.error(err);
				deferred.reject();
			});

			return deferred.promise;
		},
		crag: function(slug){
			var cragRef = new Firebase('https://pocket-beta-staging.firebaseio.com/crags/' + slug);
			crag = $firebaseObject(cragRef);
			return crag;
		},
		countries: function(){
			return data.countrylist;
		},

	};

	return service;

}]);