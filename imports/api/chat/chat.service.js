import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
//import { UploadFS } from 'meteor/jalik:ufs';

import { Users } from '../users/index';
import { Channels, Messages } from './index';
import { alertesService } from '../alertes/alertes.service';

const name = 'chatService';

export default angular.module(name, ['alertesService'])
.service(name, function ($q, $rootScope, $compile, $document, alertesService) {
	'ngInject';

	//Meteor.subscribe('userstatus');
	Meteor.subscribe('channels');
	Meteor.subscribe('messages');

	this.users = [];
	this.chatboxes = [];

	this.open = function(users){
		var date = new Date();
		var defer = $q.defer();
		this.users = users;

		var channelid = this.findChannelByUsers(users);
		if(channelid && channelid._id){
			defer.resolve(channelid._id);
		}else{
			Channels.insert({
					owner:Meteor.userId(),
					users:users,
					createdAt:date
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

	this.findChannelByUsers = function(users){
		return Channels.findOne({ users: { $size: users.length, $all:users } }, {reactive:false}); 
	}

	this.findChannelById = function(channelId){
		return Channels.findOne(channelId); 
	}

	this.close = function(channelid){
		this.chatboxes.splice(this.findChatbox(channelid), 1);
		$rootScope.$broadcast('chatbox-destroy');
	}

	this.collapse = function(channelid, collapse){
		this.findChatbox(channelid).collapse = collapse;
		if(!collapse) alertesService.setRead(channelid);
	}

	this.getMessages = function(channelId){
		return Messages.find({channelId:channelId}, {sort:{createdAt:1}}).map(function(doc){
			doc.user = Users.findOne(doc.owner);
			return doc;
		})
	}

	this.sendMessage = function(message, users, channelid){
		var self = this;

		alertesService.setRead(channelid);
		return Messages.insert({
					channelId:channelid,
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
																channelId:channelid,
																messageId:messageId
															},
															createdAt:new Date()
														})
											}
										});

						alertesService.insertAlerte(inserts);
					}
				})
	}

	this.newChatbox = function($scope, chattersId){
		chattersId = (!angular.isArray(chattersId)) ? chattersId.split(',') : chattersId;
		if(_.indexOf(chattersId, Meteor.userId()) == -1)
			chattersId.push(Meteor.userId());

		var self = this;
		this.open(chattersId).then(function(channelid){
			var chatboxId = self.findChatbox(channelid);

			if(!chatboxId){
				var el = $compile('<chat chatters="' + chattersId.join(',') + '" channel="' + channelid + '"></chat>')($scope);
				$($document[0].body).find('#main').append(el); 
			}else{
				$rootScope.$broadcast('chatbox-reveal', channelid);
			}
			
			alertesService.setRead(channelid);
		});
	}

	this.findChatbox = function(channelid, collapse){
		var search = {channel:channelid};
		if(collapse) search.collapse = collapse
		var r = (this.chatboxes.length) ? _.find(this.chatboxes, search) : null;
		return r;
	}

	this.registerChatbox = function(channelid, element){
		if(!this.chatboxes) this.chatboxes = [];
		this.chatboxes.push({channel:channelid, element:element, collapse:false});
	}

	this.isCollapse = function(channelid){
		var c = this.findChatbox(channelid);
	}

	this.getChatboxes = function(){
		return this.chatboxes;
	}

	this.getNewAlertes = function(){
		return alertesService.newAlertes();
	}
})