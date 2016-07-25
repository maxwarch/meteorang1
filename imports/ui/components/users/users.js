import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as usersService } from '../../../api/users/users.service';
import { name as chatService } from '../../../api/chat/chat.service';
import template from './users.html';
import userTpl from './user.html';

const name = 'users';

class Users{
	constructor($scope, $rootScope, $element, $attrs, $compile, $reactive, usersService, chatService){
		'ngInject';

		this.$rootScope = $rootScope;
		this.$compile = $compile;
		this.$element = $element;
		$reactive(this).attach($scope);

		this.helpers({
			online(){
				return usersService.online();
			},
			all(){
				return usersService.all();
			},
			isLoggedIn(){
				return usersService.isLoggedIn();
			}
		});
	}
}


class User{
	constructor($scope, $reactive, usersService, chatService){
		'ngInject';

		this.$scope = $scope;
		this.chatService = chatService;

		$reactive(this).attach($scope);

		this.helpers({

		});
	}

	newChat(){
		this.chatService.newChatbox(this.$scope, this.chatter._id)
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	usersService,
	chatService
])

.component(name, {
	templateUrl:template,
	controller:Users,
	controllerAs:name
})

.component('user', {
	templateUrl:userTpl,
	controller:User,
	controllerAs:'user',
	bindings:{
		chatter:'<'
	}
})