import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Users } from '../users/index';
import { Alertes } from './index';
import { Messages } from '../chat/index';
import { usersService } from '../users/users.service';

const name = 'alertesService';

export default angular.module(name, ['usersService'])
.service(name, function (usersService) {
	'ngInject';

	var Auteurs = new Mongo.Collection('chatauteurs');
	Meteor.subscribe('alertes');
	
	this.insertAlerte = function(data){
		return Alertes.batchInsert(data);
	}

	this.checkAlertes = function(){
		return Alertes.find().map(function(doc){
					doc.owner = Auteurs.findOne(doc.owner);
					doc.message = Messages.findOne(doc.options.messageId)
					return doc
				})
	}

	this.newAlertes = function(){
		return Alertes.find({ status:'open' }).count();
	}

	this.setRead = function(channelid){
		Meteor.call('setAlertesRead', channelid, Meteor.userId());
	}
})