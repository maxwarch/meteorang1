import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import { Users } from './index';

const name = 'usersService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Meteor.subscribe('userstatus');

	this.isLoggedIn = function(){
		return !!Meteor.userId();		
	}

	this.online = function(){
		return Users.find({_id:{$ne:Meteor.userId()}}, {fields:{profile:1}})
	}

	this.userIsOnline = function(users){
		//return Users.find({_id:{$in:users}}); 
	}
})