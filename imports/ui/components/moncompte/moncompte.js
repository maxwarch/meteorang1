import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

import { Users } from '../../../api/users';
import template from './moncompte.html';

const name = 'moncompte';

class MonCompte{
	
	constructor($scope, $reactive, $state){
		'ngInject';
		this.$state = $state;

		$reactive(this).attach($scope);

		this.user = null;

		this.helpers({
			currentUser() {
				this.user = this.user || Meteor.user();
				return this.user;
			}
		});
	}

	update(data){
		console.log(data)
		//Users.update(Meteor.userId(), this.user);
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('moncompte', {
        url: '/moncompte',
        controllerAs: name,
        controller: MonCompte,
        templateUrl: template
    })
})