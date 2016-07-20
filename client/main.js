import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import 'angular-i18n/angular-locale_fr-fr';

import { name as LoginLayout } from '../imports/ui/layouts/login/login';
import { name as BaseLayout } from '../imports/ui/layouts/base/base';
import { name as RegisterLayout } from '../imports/ui/layouts/register/register';


require('../imports/api/adminLTE/app');

_ = lodash;

const name = 'app';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  BaseLayout,
  LoginLayout,
  RegisterLayout
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('master',{
      abstract: true,
      //url: '',
      views: {
        'base': {
          template: '<div ui-view="container"></div>'
        }
      }
    });

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})

.run(function($rootScope, $document, $state) {
	'ngInject';
  var script   = document.createElement("script");
  script.type  = "text/javascript";
  script.src   = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js";

  script.onload = $.AdminLTE.initAdminLTE
  document.body.appendChild(script);

  $rootScope.$state = $state.current.name;
})