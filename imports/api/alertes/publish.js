import { Meteor } from 'meteor/meteor';

import { Alertes } from './collection';
import { Messages } from '../chat/collection';

if (Meteor.isServer){
	/*Meteor.publish('alertes', function(){
		return Alertes.find({userId:this.userId, status:'open'});
	})*/

	Meteor.publishComposite('alertes', {
	    find: function() {
	        return Alertes.find({userId:this.userId, status:'open'}, {type:0, userId:0})
	    },
	    children: [
	        {
	        	collectionName:'chatauteurs',
	            find: function(doc) {
	                return Meteor.users.find({_id:doc.owner}, {limit:1, fields:{profile:1}})
	            }
	        },
	        {
	            find: function(doc) {
	                return Messages.find({_id:doc.options.messageId}, {owner:0, type:0, userId:0});
	            }
	        }
	    ]
	});
}