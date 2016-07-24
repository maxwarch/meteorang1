import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as usersService } from '../../../api/users/users.service';
import { name as PartiesList } from '../partiesList/partiesList';
import { name as Users } from '../users/users';

import template from './sidebar.html';

const name = 'sidebar';

class Sidebar{
	constructor($scope, $reactive, $state, usersService){
		'ngInject';
		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({
			online(){
				return usersService.nbConnected();
			}
		});
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	Users,
	usersService,
	PartiesList
])

.component(name, {
	templateUrl:template,
	controller:Sidebar,
	controllerAs:name
})