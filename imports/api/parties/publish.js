import { Meteor } from 'meteor/meteor';
 
import { Parties } from './collection';

if (Meteor.isServer){
	

	Meteor.publishComposite('parties', {
	    find: function() {
	    	const selector = {
							$or: [
							{
					        	// the public parties
						        $and: [ { public: true }, { public: { $exists: true }} ]
							}, 
							{
						        // when logged in user is the owner
						        $and: [{ owner: this.userId }, { owner: { $exists: true }} ]
						    }]
						};
	        return Parties.find(selector)
	    },
	    children: [
	        {
	        	collectionName: "auteurs",
	            find: function(party) {
	            	console.log('ok')
	                return Meteor.users.find({_id:party.owner}, {limit:1, fields:{profile:1}})
	            }
	        }
	    ]
	});
}