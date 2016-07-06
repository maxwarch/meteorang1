import { Meteor } from 'meteor/meteor';

if (Meteor.isServer){
	Meteor.publish('userStatus', function() {
		console.log(Meteor.users.find({ 'status.online': true }, { fields: { profile:1 } }).fetch())
	  	return Meteor.users.find({ 'status.online': true }, { fields: { profile:1 } });
	});
}
