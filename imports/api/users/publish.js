import { Meteor } from 'meteor/meteor';
import { Users } from './collection';

if (Meteor.isServer){
	Meteor.publish('userstatus', function() {
	  	return Users.find({ 'status.online': true }, { fields: { profile:1, status:1 } });
	});
}
