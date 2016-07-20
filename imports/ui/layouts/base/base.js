import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as MainHeader } from '../../components/mainHeader/mainHeader';
import { name as Users } from '../../components/users/users';
import { name as Chat } from '../../components/chat/chat';
import { name as Home } from '../../components/home/home';
import { name as Sidebar } from '../../components/sidebar/sidebar';
import { name as ControlSidebar } from '../../components/controlSidebar/controlSidebar';

import baseTpl from './base.html';

class BaseCtrl{
	constructor($scope, $reactive, $state, isLoggin){
		'ngInject';
		this.$state = $state;
		if(!isLoggin){
      $state.go('master.login');
    }

    $('body').removeClass('login-page');
    $('body').addClass('sidebar-mini');
    $(document).trigger('resize');
    //initAdminLTE();
	}
}

const name = 'baseCtrl';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	MainHeader,
	Users,
	Chat,
	Sidebar,
	ControlSidebar
])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  	.state('master.home', {
      	url: '/',
        views:{
          'container@master':{
            templateUrl:baseTpl,
            controller:BaseCtrl,
          }
        },
        resolve:{
          isLoggin:function(){
            return !!Meteor.userId();
          }
        }
    });
})