import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './message.html';
import messageItem from './messageItem.html';
import { name as alertesService } from '../../../api/alertes/alertes.service';
import { name as chatService } from '../../../api/chat/chat.service';

const name = 'message';

class Message{
	constructor($scope, $reactive, $state, alertesService, chatService){
		'ngInject';
		this.$state = $state;
		this.$scope = $scope;

		$reactive(this).attach($scope);

		this.helpers({
			checkAlertes(){
				return alertesService.checkAlertes();
			},

			openChat(){
				chatService.newChatbox($scope, Meteor.userId())
			}
		});
	}
}

class MessageItem{
	constructor($scope, $reactive){
		'ngInject';
		$reactive(this).attach($scope);

		this.helpers({
			message(){
				return this.msg;
			}
		});
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	alertesService,
	chatService
])

.component(name, {
	templateUrl:template,
	controller:Message,
	controllerAs:name
})

.component('messageItem', {
	templateUrl:messageItem,
	controller:MessageItem,
	controllerAs:'messageItem',
	bindings:{
		channelId:'@',
		msg:'<'
	}
})