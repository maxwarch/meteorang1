import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as usersService } from '../../../api/users/users.service';
import { name as chatService } from '../../../api/chat/chat.service';
import template from './users.html';

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
			isLoggedIn(){
				return usersService.isLoggedIn();
			},
			hasMessage(){
				return chatService.watchMessage();
			}
		});
	}
}


class User{
	constructor($scope, $rootScope, $document, $element, $attrs, $compile, $reactive, usersService, chatService){
		'ngInject';

		this.$scope = $scope;
		this.$compile = $compile;
		this.$document = $document;

		$reactive(this).attach($scope);

		this.helpers({

		});
	}

	newChat(){
		var el = this.$compile('<chat chatter="' + this.chatter._id + '"></chat>')(this.$scope);
		$(this.$document[0].body).append(el);
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
	template:'<a href="#" ng-click="user.newChat()">{{ user.chatter.profile.pseudo }}</a>',
	controller:User,
	controllerAs:'user',
	bindings:{
		chatter:'<'
	}
})