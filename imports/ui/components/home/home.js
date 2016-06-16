import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './home.html';

class Home{}

const name = 'home';

// create a module
export default angular.module(name, [
  angularMeteor
])
.component(name, {
	templateUrl:template,
	controller:Home,
	controllerAs:name
})