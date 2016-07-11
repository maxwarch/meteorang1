import angular from 'angular';
import { Mongo } from 'meteor/mongo';

import { Parties } from './index';
import { Images, Thumbs } from '../images';

const name = 'partiesService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Auteurs = new Mongo.Collection('auteurs');
	Meteor.subscribe('parties');

	this.getParties = function(id){
		var self = this;
		var result = {};

		if(id){
			result = Parties.findOne(id);
			if(result){
				result.auteur = Auteurs.findOne(result.owner);
				result.thumbs = Thumbs.find({originalId:{$in:result.images || []}}, {fields:{url:1}}).fetch()
				result.images = self.getImages(result.images).fetch();
			}
		}else{
			result = Parties.find().map(function(doc){
							doc.auteur = Auteurs.findOne(doc.owner);
							doc.thumbs = Thumbs.find({originalId:{$in:doc.images || []}}, {fields:{url:1}}).fetch()
							doc.images = self.getImages(doc.images).fetch();
							return doc;
						});
		}

		return result;
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