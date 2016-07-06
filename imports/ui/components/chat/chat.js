import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './chat.html';
import { name as usersService } from '../../../api/users/users.service';

const name = 'chat';

class Chat{
	
	constructor($scope, $reactive, $state, usersService){
		'ngInject';
		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({
			isLoggedIn(){
				return usersService.isLoggedIn();
			}
		});
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	usersService
])
.component(name, {
	templateUrl:template,
	controller:Chat,
	controllerAs:name
})