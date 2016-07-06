import angular from 'angular';

import { Users } from './index';

const name = 'usersService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Meteor.subscribe('userStatus');

	this.isLoggedIn = function(){
		return !!Meteor.userId();		
	}

	this.online = function(){
		console.log(Users.find({'status.online':true}).fetch())
		return Meteor.users.find({'status.online':true})
	}
})