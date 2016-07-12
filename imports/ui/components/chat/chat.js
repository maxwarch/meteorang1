import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './chat.html';
import { name as usersService } from '../../../api/users/users.service';
import { name as chatService } from '../../../api/chat/chat.service';

const name = 'chat';

class Chat{
	
	constructor($scope, $element, $attrs, $reactive, usersService, chatService){
		'ngInject';

		$reactive(this).attach($scope);
		this.chatService = chatService;
		this.message = '';
		this.$attrs = $attrs;

		this.helpers({
			isLoggedIn(){
				return usersService.isLoggedIn();
			},

			messages(){
				return chatService.getMessages(this.channel);
			},

			myId(){
				return Meteor.userId();
			}
		});

		var self = this;
		var minimize = $($element).find('.panel-heading span.icon_minim');
		minimize.on('click', function(e){
			e.preventDefault();
			if (!minimize.hasClass('panel-collapsed')) {
		        $($element).find('.panel-body').slideUp();
		        minimize.addClass('panel-collapsed');
		        minimize.removeClass('glyphicon-minus').addClass('glyphicon-plus');
		    } else {
		        $($element).find('.panel-body').slideDown();
		        minimize.removeClass('panel-collapsed');
		        minimize.removeClass('glyphicon-plus').addClass('glyphicon-minus');
		    }
		})

		var supp = $($element).find('.panel-heading span.icon_close');
		supp.on('click', function(e){
			e.preventDefault();
			$scope.$destroy();
			$($element).remove();
			chatService.close(self.channel);
		})
	}

	send(){
		if(this.channel){
			this.chatService.sendMessage(this.message, this.chatter.split(','), this.channel);
		}else{
			var self = this;
			this.chatService.open(this.chatter.split(','))
				.then(function(id){
					self.$attrs.$set('channel', id);
					self.chatService.sendMessage(self.message, self.channel);
					self.message = '';
				},
				function(err){
					console.log(err)
				})
		}
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	usersService,
	chatService
])
.component(name, {
	bindings:{
		chatter:'@',
		channel:'@'
	},
	templateUrl:template,
	controller:Chat,
	controllerAs:name
})