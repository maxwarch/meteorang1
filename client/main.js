import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import 'angular-i18n/angular-locale_fr-fr';

import base from '../imports/ui/layouts/base/base.html';
import { name as LayoutBase } from '../imports/ui/layouts/base/base';

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
  uiRouter
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('master',{
      abstract: true,
      url: '',
      views: {
        'base': {
          template: '<div ui-view="container"></div>'
        }
      }
    })
  	.state('master.home', {
      	url: '/',
        views:{
          'container@master':{
            templateUrl:base,
            controller:LayoutBase
          }
        }
    });

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})

.run(function($rootScope, $document, $state) {
	'ngInject';
   $rootScope.$state = $state.current.name;
})