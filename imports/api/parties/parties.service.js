import angular from 'angular';

import { Parties, Auteurs } from './index';
import { Images, Thumbs } from '../images';

const name = 'partiesService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Meteor.subscribe('parties');
	Meteor.subscribe('images');

	this.getParties = function(id){
		if(id) return Parties.findOne(id);
		return Parties.find();
	}

	this.getAuteur = function(id){
		return Auteurs.findOne(id);
	}

	this.setPrivate = function(party){
		Parties.update(party._id, {$set:{public : party.public}});
	}

	this.remove = function(party) { 
	    if (party) {
	      Parties.remove(party._id);
	      if(party.images){
	      	console.log(party)
	      	_.each(party.images, function(id){
	      		Images.remove(id);
	      	})
	      }
	    }
	}

	this.getImages = function(ids){
		return Images.find({_id:{$in:ids || []}});
	}
})