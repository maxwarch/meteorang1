import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Channels = new Mongo.Collection('channels');
export const Chats = new Mongo.Collection('chats');

function loggedIn(userId) {
	return !!userId;
}
 
Channels.allow({
	insert: loggedIn,
	update: loggedIn,
	remove: loggedIn
});

Chats.allow({
	insert: loggedIn,
	update: loggedIn,
	remove: loggedIn
});