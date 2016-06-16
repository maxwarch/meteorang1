import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { name as MonCompte } from '../moncompte/moncompte';
import template from './auth.component.html';

class AuthButton{
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
	}

	logout(){
		Accounts.logout();
		this.$state.go('app')
	}

}

const name = 'authButton';

export default angular.module(name, [angularMeteor, MonCompte])

.component(name, {
	templateUrl:template,
	controller:AuthButton,
	controllerAs:name
})