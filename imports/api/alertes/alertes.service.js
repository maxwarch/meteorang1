import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import { Users } from '../users/index';
import { Alertes } from './index';
import { Messages } from '../chat/index';
import { usersService } from '../users/users.service';

const name = 'alertesService';

export default angular.module(name, ['usersService'])
.service(name, function (usersService) {
	'ngInject';

	Meteor.subscribe('alertes');
	
	this.newAlerte = function(data){
		return Alertes.batchInsert(data);
	}

	this.checkAlertes = function(){
		return Alertes.find({ status:'open' }).map(function(doc){
					doc.owner = Users.findOne(doc.owner);
					doc.message = Messages.findOne(doc.options.messageId)
					return doc
				})
	}

	this.setRead = function(channelid){
		Meteor.call('setAlertesRead', channelid, Meteor.userId());
		//Alertes.update({ 'options.channelid':channelid }, { $set:{ status:'read' } });
	}
})