import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import { Users } from './index';

const name = 'usersService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	this.isLoggedIn = function(){
		return !!Meteor.userId();		
	}

	this.online = function(){
		Meteor.subscribe('userstatus');
		return Users.find({ $and:[{ 'status.online': true, _id:{$ne:Meteor.userId()} }] });
	}

	this.userIsOnline = function(id){
		return Users.find(id);
	}
})