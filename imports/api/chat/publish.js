import { Meteor } from 'meteor/meteor';

import { Channels, Messages } from './collection';

if (Meteor.isServer){
	Meteor.publish('channels', function(){
		return Channels.find()
	})

	Meteor.publishComposite('messages', {
	    find: function() {
	        return Messages.find()
	    },
	    children: [
	        {
	            find: function(doc) {
	                return Meteor.users.find({_id:doc.owner}, {limit:1, fields:{profile:1}})
	            }
	        }
	    ]
	});
}