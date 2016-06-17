import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Parties = new Mongo.Collection('parties');/*, {
	transform: function(doc){
		doc.user = Meteor.users.findOne({
			_id:doc.owner
		}, {fields:{profile:1}});
		console.log(doc)
		return doc;
	}
});*/

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
