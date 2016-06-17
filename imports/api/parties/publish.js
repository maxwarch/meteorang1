import { Meteor } from 'meteor/meteor';
 
import { Parties } from './collection';

if (Meteor.isServer){
	Meteor.publish('parties', function() {
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
		//console.log(Parties.find(selector).fetch())
		//return Parties.find(selector);
		let d = Parties
				.find(selector)
				.forEach(function(item){
					item.user = Meteor.users.findOne({_id:item.owner}, {fields:{profile:1}})
					console.log(item)
				});
		return (d)
		this.ready();
	});

	Meteor.publish('auteurs', function(userIds) {
	  	return Meteor.users.find({_id: {$in: userIds}});
	});
}