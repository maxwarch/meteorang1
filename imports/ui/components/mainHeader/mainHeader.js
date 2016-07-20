import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './mainHeader.html';
//import { name as PartiesList } from '../partiesList/partiesList';
//import { name as PartiesDetails } from '../partyDetails/partyDetails';
//import { name as Auth } from '../auth/auth';
import { name as AuthButton } from '../auth/auth';
import { name as Message } from '../message/message';


class MainHeader{
	constructor($scope, $reactive){
		'ngInject';
		$reactive(this).attach($scope);
		this.helpers({
			
		})
	}
}

const name = 'mainHeader';

// create a module
export default angular.module(name, [
  angularMeteor,
  //PartiesDetails,
  //PartiesList,
  //Auth,
  AuthButton,
  //Message
])

.component(name, {
  templateUrl:template,
  controllerAs: name,
  controller:MainHeader
})
