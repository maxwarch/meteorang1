import { Meteor } from 'meteor/meteor';

import { Channels, Chats } from './collection';

if (Meteor.isServer){
	Meteor.publish('channels', function(){
		return Channels.find()
	})

	Meteor.publish('chats', function(){
		return Chats.find()
	})
}