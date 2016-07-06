import angular from 'angular';

const name = 'usersService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	this.isLoggedIn = function(){
		return !!Meteor.userId();		
	}
})