import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Alertes = new Mongo.Collection('alertes');

function loggedIn(userId) {
	return !!userId;
}
 
Alertes.allow({
	insert: loggedIn,
	update: loggedIn,
	remove: loggedIn
});