import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './chat.html';
import { name as usersService } from '../../../api/users/users.service';
import { name as chatService } from '../../../api/chat/chat.service';

const name = 'chat';

class Chat{
	
	constructor($scope, $rootScope, $element, $attrs, $reactive, usersService, chatService){
		'ngInject';

		$reactive(this).attach($scope);
		this.chatService = chatService;
		this.$element = $element;
		this.$scope = $scope;
		this.message = '';
		this.iscollapse = false;
		this.$attrs = $attrs;

		chatService.registerChatbox(this.channel);

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

		this.btCollapse = $($element).find('.panel-heading span.icon_minim');
		this.btClose = $($element).find('.panel-heading span.icon_close');

		var self = this;

		this.btCollapse.on('click', function(e){
			e.preventDefault();
			if(self.iscollapse){
				self.maximize();
			}else{
				self.minimize();
			}
		})

		this.btClose.on('click', function(e){
			e.preventDefault();
			self.close();
		});

		$rootScope.$on('chatbox-reveal', function(e, id){
			if(id == self.channel){
				self.maximize();
			}
		});
	}

	send(){
		if(this.channel){
			this.chatService.sendMessage(this.message, this.chatters.split(','), this.channel);
			this.message = '';
		}else{
			var self = this;
			this.chatService.open(this.chatters.split(','))
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

	minimize(){
        $(this.$element).find('.panel-body').slideUp();
    	this.btCollapse.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    	this.iscollapse = true;
	}

	maximize(){
        $(this.$element).find('.panel-body').slideDown();
	    this.btCollapse.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        this.iscollapse = false;
	}

	close(){
		this.$scope.$destroy();
		$(this.$element).remove();
		this.chatService.close(this.channel);
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
		chatters:'@',
		channel:'@'
	},
	templateUrl:template,
	controller:Chat,
	controllerAs:name
})