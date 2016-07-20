import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as formValidators } from '../../../helpers/formValidators';

import loginTpl from './login.html';

class LoginCtrl{
	constructor($scope, $reactive, $state, isLoggin){
		'ngInject'; 

		if(isLoggin){
	      $state.go('master.home');
	    }

		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({
			isLoggedIn() {
				return !!Meteor.userId();
			},

			currentUser() {
				return Meteor.user();
			}
		})

		this.credentials = {
			email: '',
			password: ''
		};

		this.error = null;

		$('body').removeClass('sidebar-mini');
		$('body').addClass('login-page');
	}

	login() {
		Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
			this.$bindToContext((err) => {
				if (err) {
					this.error = err;
					console.log(err)
				} else {
					this.$state.go('master.home');
				}
			})
		);
	}
}

const name = 'loginCtrl';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	formValidators
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
	'ngInject';

	$stateProvider
	.state('master.login', {
		url: '/login',
		views:{
			'container@master':{
				templateUrl:loginTpl,
				controller:LoginCtrl,
				controllerAs:name
			}
		},
        resolve:{
          isLoggin:function(){
            return !!Meteor.userId();
          }
        }
	});
})