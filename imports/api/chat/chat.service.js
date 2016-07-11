import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import { Users } from '../users/index';
import { Channels, Chats } from './index';

const name = 'chatService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Meteor.subscribe('userstatus');
	Meteor.subscribe('channels');
	Meteor.subscribe('chats');

	this.open = function(users){
		return Channels.insert({
					startuser:Meteor.userId(),
					users:users,
					status:'open'
				})
	}

	this.close = function(id){
		return Channels.update(id, {
					status:'close'
				})
	}

	this.isOpen = function(channel){
		return Channel.find(channel, {status:'open'}).count() > 0;
	}
})