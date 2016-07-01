import { Meteor } from 'meteor/meteor';
 
import { Parties } from './collection';
import { Thumbs } from '../images/collection';

if (Meteor.isServer){
	
	Meteor.publish('parties', function(query, options) {
		var self = this;

		const selector = {
							$or: [
									{ $and: [ { public: true }, { public: { $exists: true }} ]}, 
									{ $and: [{ owner: this.userId }, { owner: { $exists: true }}]}
								]
						};

		var handler = null;
		query = (query == undefined) ? selector : query;
		options = (options == undefined) ? {} : options;
		
		handler = Parties.find(query, options).observeChanges({
			added: function (id, doc) {
				var that = this
				doc.auteur = Meteor.users.findOne({_id: doc.owner}, {fields:{email:1, profile:1}});

				doc.thumbs = [];
				if(doc.images){
					doc.thumbs = Thumbs.find({originalId:{$in:doc.images || []}}, {fields:{url:1}}).fetch();
				}
				self.added('parties', id, doc);
			},
			changed: function (id, fields) {

				self.changed('parties', id, fields);
			},
			removed: function (id) {
				self.removed('parties', id);
			}
		});

		self.ready();
		self.onStop(function () {
			if(handler) handler.stop();
		});
	});

	/*Meteor.publishComposite('parties', {
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
	                return Meteor.users.find({_id:party.owner}, {limit:1, fields:{profile:1}})
	            }
	        }
	    ]
	});*/
}