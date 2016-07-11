import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './chat.html';
import { name as usersService } from '../../../api/users/users.service';
import { name as chatService } from '../../../api/chat/chat.service';

const name = 'chat';

class Chat{
	
	constructor($scope, $element, $reactive, usersService, chatService){
		'ngInject';

		$reactive(this).attach($scope);

		this.helpers({
			isLoggedIn(){
				return usersService.isLoggedIn();
			},

			chatPartner(){
				return Meteor.users.findOne(this.chatter, {fields:{profile:1}});
			}
		});

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
			$($element).remove()
		})
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
		chatter:'@'
	},
	templateUrl:template,
	controller:Chat,
	controllerAs:name
})