import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';
import { name as Register } from '../register/register';

class Auth{
	constructor($scope, $reactive, $state){
		'ngInject';
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
	}

	login() {
	    Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
	      this.$bindToContext((err) => {
	        if (err) {
	          this.error = err;
	          console.log(err)
	        } else {
	          this.$state.go('parties');
	        }
	      })
	    );
	  }
}

const name = 'auth';

export default angular.module(name, [angularMeteor, uiRouter, Register])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('auth', {
        url: '/login',
        controllerAs: name,
        controller: Auth,
        templateUrl: template
    })
})