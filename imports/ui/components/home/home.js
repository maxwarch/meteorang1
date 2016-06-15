import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './layout.html';
import homeContent from './home.html';
import { name as Navigation } from '../navigation/navigation';

class Home {
	constructor($rootScope, $state){
		'ngInject';

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				$rootScope.currentState = toState.name;
			}
		);
	}
}

const name = 'home';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Navigation
]).component(name, {
  templateUrl:template,
  controllerAs: name,
  controller: Home
})

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  	.state('home', {
  		name:'home',
      	url: '/',
      	templateUrl: homeContent
    })

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})

.run(function($rootScope, $state) {
	'ngInject';
   	$rootScope.$state = $state.current.name;
})