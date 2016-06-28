import { Meteor } from 'meteor/meteor';
 
import { Parties } from './collection';

if (Meteor.isServer){
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

	/*Meteor.publishComposite('parties', {
	    find: function() {
	        // Find top ten highest scoring posts
	        return Parties.find(selector)
	    },
	    children: [
	        {
	            find: function(party) {
	            	console.log(Meteor.users.find({_id:party.owner}, {limit:1, fields:{emails:1, profile:1}}).fetch());
	                return Meteor.users.find({_id:party.owner}, {limit:1, fields:{profile:1}});
	            }
	        }
	    ]
	});*/
	Meteor.publish('parties', function() {
		//console.log(Parties.find(selector).fetch())
		//return Parties.find(selector);
		var d = Parties
				.find(selector)
				.forEach(function(item){
					item.user = Meteor.users.findOne({_id:item.owner}, {fields:{profile:1}})
					//console.log(item)
				});
		console.log(d)
		if(d) return (d)
		return this.ready();
	});

	Meteor.publish('auteurs', function(userIds) {
	  	return Meteor.users.find({_id: {$in: userIds}});
	});
}