import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import 'angular-i18n/angular-locale_fr-fr';

import { name as LoginPage } from '../imports/ui/pages/login/login';
import { name as HomePage } from '../imports/ui/pages/home/home';
import { name as RegisterPage } from '../imports/ui/pages/register/register';


require('../imports/api/adminLTE/app');

_ = lodash;

const name = 'app';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  HomePage,
  LoginPage,
  RegisterPage
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  /*$stateProvider
    .state('master',{
      abstract: true,
      url: '',
      template: '<div ui-view></div>'
    });*/

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home/dashboard');
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