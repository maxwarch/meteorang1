import angular from 'angular';
import angularMeteor from 'angular-meteor';

class Home{}

const name = 'home';

// create a module
export default angular.module(name, [
  angularMeteor
])