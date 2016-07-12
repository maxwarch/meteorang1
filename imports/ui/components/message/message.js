import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './message.html';
import { name as alertesService } from '../../../api/alertes/alertes.service';

const name = 'message';

class Message{
	constructor($scope, $reactive, $state, alertesService){
		'ngInject';
		this.$state = $state;
		this.$scope = $scope;

		$reactive(this).attach($scope);

		this.helpers({
			checkAlertes(){
				return alertesService.checkAlertes();
			}
		});
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	alertesService
])

.component(name, {
	templateUrl:template,
	controller:Message,
	controllerAs:name
})