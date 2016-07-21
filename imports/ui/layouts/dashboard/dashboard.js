import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as Chat } from '../../components/chat/chat';

import template from './dashboard.html';

const name = 'dashboard';

class Dashboard{
	constructor($scope, $reactive, $state){
		'ngInject';
		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({

		});
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	Chat
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('home.dashboard', {
        url: '/dashboard',
        views:{
	        	'content@home':{
		        	controllerAs: name,
			        controller: Dashboard,
			        templateUrl: template,
			    },
			    'title@home':{
			    	template:'Tableau de bord'
			    }
	        }
    })
})