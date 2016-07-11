import { Meteor } from 'meteor/meteor';

if (Meteor.isServer){
	Meteor.publish('userstatus', function() {
	  	return Meteor.users.find({ 'status.online': true }, { fields: { profile:1 } });
	});
}
