import angular from 'angular';

import { Parties, Auteurs } from './index';

const name = 'partiesService';

export default angular.module(name, [])
.service(name, function () {
	'ngInject';

	Meteor.subscribe('parties');

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
	    }
	  }
})