import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import { Users } from '../users/index';
import { Channels, Messages } from './index';

const name = 'chatService';

export default angular.module(name, [])
.service(name, function ($q) {
	'ngInject';

	Meteor.subscribe('userstatus');
	Meteor.subscribe('channels');
	Meteor.subscribe('messages');

	this.open = function(users){
		var defer = $q.defer();

		Channels.insert({
					owner:Meteor.userId(),
					users:users,
					status:'open',
					createdAt:new Date()
				}, function(err, id){
					if(err){
						defer.reject('Impossible d\'ouvrir le chat');
					}else{
						defer.resolve(id);
					}
				});

		return defer.promise;
	}

	this.close = function(id){
		return Channels.update(id, {
					status:'close',
					closeAt:new Date()
				})
	}

	this.sendMessage = function(message, channelId){
		return Messages.insert({
					channelId:channelId,
					owner:Meteor.userId(),
					message:message,
					createdAt:new Date()
				})
	}

	this.watchMessage = function(){
		//return Channels.find(users)
	}

	this.isOpen = function(channel){
		return Channel.find(channel, {status:'open'}).count() > 0;
	}
})