import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Auteurs = new Mongo.Collection('auteurs');
export const Parties = new Mongo.Collection('parties');

Parties.allow({
	insert(userId, party) {
		return userId && party.owner === userId;
	},
	update(userId, party, fields, modifier) {
		return userId && party.owner === userId;
	},
	remove(userId, party) {
		return userId && party.owner === userId;
	}
});
