import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './sidebar.html';

const name = 'sidebar';

class Sidebar{
	constructor($scope, $reactive, $state){
		'ngInject';
		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({

		});
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter
])

.component(name, {
	templateUrl:template,
	controller:Sidebar,
	controllerAs:name
})