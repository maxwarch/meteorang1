import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as formValidators } from '../../../helpers/formValidators';
import template from './register.html';

const name = 'register';

class Register{
	constructor($scope, $reactive, $state, isLoggin){
		'ngInject';
		if(isLoggin){
	      $state.go('master.home');
	    }
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

		this.error = null;

		$('body').removeClass('sidebar-mini')
		$('body').addClass('register-page')
	}

	inscription(){
		Accounts.createUser(this.infos,
	      this.$bindToContext((err) => {
	        if (err) {
	          this.error = err;
	        } else {
	          this.$state.go('master.home');
	        }
	      })
	    );
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	formValidators
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('master.register', {
        url: '/register',
        views:{
			'container@master':{
				templateUrl:template,
				controller:Register,
				controllerAs:name
			}
		},
        resolve:{
          isLoggin:function(){
            return !!Meteor.userId();
          }
        }
    })
})