import angular from 'angular';

const name = 'formValidators';

export default angular.module(name, [])

/**
 * @function kr-email-validator
 * @desc permet de valider un email simplement
 * @example
 * <input type="text" value="" email-validator />
 */
.directive('emailValidator', [function(){
	return {
		restrict:'A',
		require:'ngModel',
		link:function(scope, element, attrs, ngModel){
			ngModel.$validators.emailValid = function(email){
				var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				return pattern.test(email)
			};
		}
	}
}])

/**
 * @function kr-email-unique
 * @desc permet de valider si un un email est unique
 * @example
 * <caption>Vérifie l'unicité du mail via l'API</caption>
 * <input type="text" value="" kr-email-unique />
 */
/*.directive('krEmailUnique', ['userService', '$q', function(userService, $q){
	return {
		restrict:'A', 
		require:'ngModel',
		link:function(scope, element, attrs, ngModel){
			ngModel.$asyncValidators.emailAvailable = function(email) {
				var deferred = $q.defer();
				userService.get(email)
							.then(function(response){
									deferred.reject();
								},
								function(error){
									deferred.resolve();
								});
				return deferred.promise;
			};
		}
	}
}])*/