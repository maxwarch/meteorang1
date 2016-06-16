import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './register.html';

const name = 'register';

class Register{
	constructor($scope, $reactive, $state){
		'ngInject';
		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({

		});

		this.infos = {
			email:'fghf@' + _.now() + '.com',
			password:'321321',
			profile:{
				nom:'nom-' + _.now(),
				prenom:'prenom-' + _.now(),
				pseudo:'pseudo-' + _.now()
			}
		}

		this.error = null
	}

	inscription(){
		Accounts.createUser(this.infos,
	      this.$bindToContext((err) => {
	        if (err) {
	          this.error = err;
	        } else {
	          this.$state.go('parties');
	        }
	      })
	    );
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('register', {
        url: '/inscription',
        controllerAs: name,
        controller: Register,
        templateUrl: template
    })
})