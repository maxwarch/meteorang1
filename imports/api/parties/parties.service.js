import angular from 'angular';

import { Parties } from './index';
import { Images, Thumbs } from '../images';

const name = 'partiesService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Meteor.subscribe('parties');
	//Meteor.subscribe('images');
	//Meteor.subscribe('thumbs');

	this.getParties = function(id){
		var self = this;
		var result = Parties.find().map(function(doc){
						doc.auteur = Meteor.users.findOne(doc.owner);
						doc.thumbs = Thumbs.find({originalId:{$in:doc.images || []}}, {fields:{url:1}}).fetch()
						doc.images = self.getImages(doc.images).fetch();
						return doc;
					});

		if(id){
			return _.find(result, {_id:id});
		} else{
			return result;
		}
		
	}

	this.setPrivate = function(party){
		Parties.update(party._id, {$set:{public : party.public}});
	}

	this.remove = function(party) { 
		if (party) {
			Parties.remove(party._id);
			if(party.images){
				_.each(party.images, function(id){
					Images.remove(id);
				})
			}
		}
	}

	this.getImages = function(ids){
		return Images.find({_id:{$in:ids || []}});
	}

	this.getThumbs = function(id){
		var post = Parties.findOne(id);
		return Thumbs.find({originalId:{$in:post.images || []}});
	}
})