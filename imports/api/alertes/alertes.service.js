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
		//if(!!usersService.userIsOnline(data.users)){
			return Alertes.batchInsert(data);
		/*}else{
			return true;
		}*/
	}

	this.checkAlertes = function(){
		return Alertes.find().map(function(doc){
					doc.owner = Users.findOne(doc.owner);
					doc.message = Messages.findOne(doc.options.messageId)
					return doc
				})
	}
})