import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './chat.html';
import msgLeft from './message-left.html';
import msgRight from './message-right.html';
import { name as usersService } from '../../../api/users/users.service';
import { name as chatService } from '../../../api/chat/chat.service';

const name = 'chat';

class Chat{
	
	constructor($scope, $rootScope, $window, $element, $attrs, $reactive, usersService, chatService){
		'ngInject';

		$reactive(this).attach($scope);
		this.chatService = chatService;
		this.$element = $element;
		this.box = $($element).find('.box');
		this.boxBody = this.box.find('.box-body');
		this.$scope = $scope;
		this.message = '';
		this.iscollapse = new ReactiveVar(false);
		this.$attrs = $attrs;
		this.boxWidgetOptions = {
									animationSpeed:500,
								    boxWidgetIcons: {
								      //Collapse icon
								      collapse: 'fa-minus',
								      //Open icon
								      open: 'fa-plus',
								      //Remove icon
								      remove: 'fa-times'
								    },
								    boxWidgetSelectors: {
								      //Remove button selector
								      close: '[data-widget="remove"]',
								      //Collapse button selector
								      collapse: '[data-widget="collapse"]'
								    }
								}

		chatService.registerChatbox(this.channel, $($element));
		var self = this;

		this.helpers({
			isLoggedIn(){
				return usersService.isLoggedIn();
			},

			messages(){
				return chatService.getMessages(this.channel);
			},

			myId(){
				return Meteor.userId();
			},

			checkAlertes(){
				return chatService.getNewAlertes();
			},

			isCollapse(){
				return this.iscollapse.get();
			}
		});

		
		this.$onInit = function(){
			this.box.find('[name=message]')[0].focus();

			this.place();
			this.btCollapse = this.box.find(this.boxWidgetOptions.boxWidgetSelectors.collapse);
			this.btClose = this.box.find(this.boxWidgetOptions.boxWidgetSelectors.close);

			this.btCollapse.on('click', $.proxy(this.collapse, this))
			this.btClose.on('click', $.proxy(this.close, this))
			$rootScope.$on('chatbox-reveal', $.proxy(this.reveal, this));
			$rootScope.$on('chatbox-destroy', $.proxy(this.place, this));
		}
	}

	scrollBoxBody(){
		this.boxBody.scrollTop(this.boxBody[0].scrollHeight);
	}

	place(){
		// placement des box de gauche à droite
		var width = parseInt($(this.$element).css('width'));
		var offset = parseInt($(this.$element).css('margin-right'));
		_.map(this.chatService.getChatboxes(), function(item, index){
			item.element.css('left', (width + offset)*index);
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

	reveal(e, channelid){
		if(this.box.hasClass("collapsed-box")) this.collapse(e, channelid);
	}

	collapse(e, channelid) {
		if(!_.isUndefined(channelid) && channelid != this.channel) return;
		var selectors 		= this.boxWidgetOptions.boxWidgetSelectors;
	    var icons 			= this.boxWidgetOptions.boxWidgetIcons;
	    var animationSpeed	= this.boxWidgetOptions.animationSpeed;
	    var _this = this;

		//Find the body and the footer
		var box_content = this.box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
		if (!this.box.hasClass("collapsed-box")) {
			this.iscollapse.set(true);
			//Convert minus into plus
			this.btCollapse.children(":first")
				.removeClass(icons.collapse)
				.addClass(icons.open);
			//Hide the content
			box_content.slideUp(animationSpeed, function () {
				_this.box.addClass("collapsed-box");
			});
		} else {
			this.iscollapse.set(false);
			//Convert plus into minus
			this.btCollapse.children(":first")
				.removeClass(icons.open)
				.addClass(icons.collapse);
			//Show the content
			box_content.slideDown(animationSpeed, function () {
				_this.box.removeClass("collapsed-box");
				_this.box.find('[name=message]')[0].focus();
				_this.scrollBoxBody()
			});
		}
		this.chatService.collapse(this.channel, this.iscollapse.get());
    }

    close(e) {
    	this.btCollapse.off('click');
    	this.btClose.off('click');
      	this.$scope.$destroy();
		$(this.$element).remove();
		this.chatService.close(this.channel);
    }
}

class MessageUser{
	constructor($scope, $element, $reactive){
		'ngInject';
		$reactive(this).attach($scope);

		this.helpers({

		});

		this.$onInit = function () {
			this.chatCtrl.scrollBoxBody()
		}
	}
}

export default angular.module('chatBox', [
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
	controllerAs:'chatbox'
})
.component('messageLeft', {
	require:{
		chatCtrl:'^chat'
	},
	bindings:{
		msg:'<'
	},
	templateUrl:msgLeft,
	controller:MessageUser,
	controllerAs:'message'
})
.component('messageRight', {
	require:{
		chatCtrl:'^chat'
	},
	bindings:{
		msg:'<'
	},
	templateUrl:msgRight,
	controller:MessageUser,
	controllerAs:'message'
})



