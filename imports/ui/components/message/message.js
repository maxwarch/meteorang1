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
		this.chatService = chatService;

		$reactive(this).attach($scope);

		this.helpers({
			checkAlertes(){
				return alertesService.checkAlertes();
			}
		});
	}

	openChat(channelId){
		var c = this.chatService.findChannelById(channelId);
		if(c && c.users)
			this.chatService.newChatbox(this.$scope, c.users)
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

.directive(name, function(){
	return {
		restrict:'E',
		replace:true,
		templateUrl:template,
		controller:Message,
		controllerAs:name
	}
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