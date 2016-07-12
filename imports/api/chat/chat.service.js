import angular from 'angular';
import { Meteor } from 'meteor/meteor';
//import { UploadFS } from 'meteor/jalik:ufs';

import { Users } from '../users/index';
import { Channels, Messages } from './index';
import { alertesService } from '../alertes/alertes.service';

const name = 'chatService';

export default angular.module(name, ['alertesService'])
.service(name, function ($q, $compile, $document, alertesService) {
	'ngInject';

	Meteor.subscribe('userstatus');
	Meteor.subscribe('channels');
	Meteor.subscribe('messages');

	this.users = [];

	this.open = function(users){
		var defer = $q.defer();
		this.users = users;

		if(id = this.findChannel(users)){
			Channels.update(id, {
					status:'open',
					openAt:new Date()
				});

			defer.resolve(id);
		}else{
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
		}

		return defer.promise;
	}

	this.findChannel = function(users){
		var r = Channels.findOne({ users: { $size: users.length, $all:users } });
		return (r) ? r._id : r;
	}

	this.close = function(id){
		return Channels.update(id, {
					status:'close',
					closeAt:new Date()
				})
	}

	this.getMessages = function(channelId){
		return Messages.find({channelId:channelId}, {sort:{createdAt:1}}).map(function(doc){
			doc.user = Users.findOne(doc.owner);
			return doc;
		})
	}

	this.sendMessage = function(message, users, channelId){
		var self = this;

		return Messages.insert({
					channelId:channelId,
					owner:Meteor.userId(),
					texte:message,
					createdAt:new Date()
				}, function(err, messageId){
					if(err){

					}else{
						var inserts = [];
						_.each(users, function(user){
											if(user != Meteor.userId()){
												inserts.push({
															userId:user, 
															owner:Meteor.userId(), 
															type:'message', 
															status:'open', 
															options:{
																channelId:channelId,
																messageId:messageId
															},
															createdAt:new Date()
														})
											}
										});

						alertesService.newAlerte(inserts);
					}
				})
	}

	this.isOpen = function(channel){
		return Channels.find({_id:channel, $and:[{status:'open'}]}).count() > 0;
	}

	this.newChatbox = function($scope, chattersId){
		chattersId = chattersId.split(',');
		if(!chattersId[Meteor.userId()])
			chattersId.push(Meteor.userId());

		var channelId = (id = this.findChannel(chattersId)) ? id : '';

		if(channelId){
			//if(!this.isOpen(channelId)){
				var el = $compile('<chat chatter="' + chattersId.join(',') + '" channel="' + channelId + '"></chat>')($scope);
				$($document[0].body).append(el);
			/*}else{
				console.log('close')
			}*/
		}else{
			var el = $compile('<chat chatter="' + chattersId.join(',') + '" channel=""></chat>')($scope);
			$($document[0].body).append(el);
		}
	}
})