import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as usersService } from '../../../api/users/users.service';
import template from './users.html';

const name = 'users';

class Users{
	constructor($scope, $reactive, usersService){
		'ngInject';

		$reactive(this).attach($scope);

		this.helpers({
			online(){
				return usersService.online();
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
	controller:Users,
	controllerAs:name
})