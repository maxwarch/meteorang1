import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Channels = new Mongo.Collection('channels');
export const Messages = new Mongo.Collection('messages');

function loggedIn(userId) {
	return !!userId;
}
 
Channels.allow({
	insert: loggedIn,
	update: loggedIn,
	remove: loggedIn
});

Messages.allow({
	insert: loggedIn,
	update: loggedIn,
	remove: loggedIn
});