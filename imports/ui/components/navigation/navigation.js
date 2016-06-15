import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './navigation.html';
import { name as PartiesList } from '../partiesList/partiesList';
import { name as PartyDetails } from '../partyDetails/partyDetails';

class Navigation{
	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.helpers({
			
		})
	}
}

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor,
  PartiesList,
  //PartyDetails
])

.component(name, {
  templateUrl:template,
  controllerAs: name,
  controller:Navigation
})
