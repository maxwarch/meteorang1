import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as Navigation } from '../imports/ui/components/navigation/navigation';
import { name as Home } from '../imports/ui/components/home/home';

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
  Navigation,
  Home
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

.run(function($rootScope, $state) {
	'ngInject';
   	$rootScope.$state = $state.current.name;
})