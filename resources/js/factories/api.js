angular.module('pocketBetaApp')
.factory('pocketBetaApp.api', ['$firebaseObject', '$q', function($firebaseObject, $q){

	var data;

	var service = {
		initialize: function(){
			var deferred = $q.defer();
			var ref = new Firebase("https://pocket-beta-staging.firebaseio.com");
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
		crags: function(){
			return data.crags;
		},
		sectors: function(){
			return data.crags.niagaraGlen.sectors; // niagara glen sectors
		},
		countries: function(){
			return data.countrylist;
		},

	};

	return service;

}]);