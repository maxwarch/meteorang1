import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as MainHeader } from '../../components/mainHeader/mainHeader';
import { name as Users } from '../../components/users/users';
import { name as Chat } from '../../components/chat/chat';
import { name as Home } from '../../components/home/home';
import { name as Sidebar } from '../../components/sidebar/sidebar';
import { name as ControlSidebar } from '../../components/controlSidebar/controlSidebar';

import template from './base.html';

class BaseCtrl{
	constructor($scope, $reactive, $state){
		'ngInject';
		this.$state = $state;

console.log('ok')
	}
}

const name = 'baseCtrl';

export default angular.module('base', [
	angularMeteor,
	uiRouter,
	MainHeader,
	Users,
	Chat,
	Sidebar,
	ControlSidebar
])

.controller(name, BaseCtrl)
/*.component(name, {
	templateUrl:template,
	controller:Base,
	controllerAs:name
})*/