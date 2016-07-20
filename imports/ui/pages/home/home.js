import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as MainHeader } from '../../components/mainHeader/mainHeader';
import { name as Users } from '../../components/users/users';
import { name as Chat } from '../../components/chat/chat';
import { name as Home } from '../../components/home/home';
import { name as Sidebar } from '../../components/sidebar/sidebar';
import { name as ControlSidebar } from '../../components/controlSidebar/controlSidebar';
import { name as Dashboard } from '../../layouts/dashboard/dashboard';

import homeTpl from './home.html';

class HomeCtrl{
	constructor($scope, $reactive, $state, isLoggin){
		'ngInject';
		this.$state = $state;
		if(!isLoggin){
	      $state.go('login');
	    }

	    $('body').removeClass('login-page');
	    $('body').addClass('sidebar-mini');
	    $(document).trigger('resize');
	}
}

const name = 'homeCtrl';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	MainHeader,
	Users,
	Chat,
	Sidebar,
	ControlSidebar,
	Dashboard
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  	.state('home', {
      	url: '/home',
      	templateUrl:homeTpl,
		controller:HomeCtrl,
        resolve:{
          isLoggin:function(){
            return !!Meteor.userId();
          }
        }
    });
})