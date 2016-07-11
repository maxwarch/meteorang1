import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Users = Meteor.users;

Users.allow({
	update(userId, user, fields, modifier) {
		return this.userId === userId;
	}
});