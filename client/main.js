import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import 'angular-i18n/angular-locale_fr-fr';

import { name as MainHeader } from '../imports/ui/components/mainHeader/mainHeader';
import { name as Users } from '../imports/ui/components/users/users';
import { name as Chat } from '../imports/ui/components/chat/chat';
import { name as Home } from '../imports/ui/components/home/home';
require('../imports/api/adminLTE/app');

_ = lodash;

class App {
	constructor($rootScope, $state){
		'ngInject';

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				$rootScope.currentState = toState.name;
			}
		);
	}


}

const name = 'app';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  MainHeader,
  Home,
  Chat,
  Users
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  	.state('app', {
      	url: '/',
      	template: '<home></home>'
    });

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})

.run(function($rootScope, $document, $state) {
	'ngInject';
   $rootScope.$state = $state.current.name;
   if(!Meteor.userId()) console.log('ok')
})