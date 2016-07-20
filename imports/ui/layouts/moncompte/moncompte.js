import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

import { Users as Users } from '../../../api/users/collection';
import template from './moncompte.html';

const name = 'moncompte';

class MonCompte{
	constructor($scope, $reactive, $state, $timeout, getUser){
		'ngInject';
		this.$state = $state;
		this.$scope = $scope;
		this.user = getUser;
		this.successVisible = false;

		$reactive(this).attach($scope);

		this.helpers({
			
		});
	}

	update(){
		if(!!Meteor.userId()){
			Meteor.users.update(Meteor.userId(), {$set:{profile:this.user.profile}}, (err, nbdoc) => {
				if(!err){
					this.successVisible = true;
					this.$scope.$apply();
					this.closeTimeout();
				}
			});
		}else{
			this.successVisible = false;
			this.$scope.$apply()
		}
	}

	closeTimeout(){
		this.successVisible = true;
		setTimeout(() => {
			this.successVisible = false;
			this.$scope.$apply();
		}, 2000)
	}
}

export default angular.module(name, [
	angularMeteor,
	uiRouter
])

.config(function($stateProvider) {
  	'ngInject';

  	$stateProvider
    	.state('home.moncompte', {
	        url: '/mon-compte',
	        views:{
	        	'content@home':{
		        	controllerAs: name,
			        controller: MonCompte,
			        templateUrl: template,
			    },
			    'title@home':{
			    	template:'Mon compte'
			    },
			    'description@home':{
			    	template:'Informations sur votre profil'
			    }
	        },
        	

	        resolve:{
	        	getUser:function($q, $state){
	        		let deferred = $q.defer();
	        		Meteor.call('getUser', Meteor.userId(), (err, result) => {
						if(!err){
							deferred.resolve(result) 
						}else{
							$state.go('app');
							deferred.reject
						}
					});
					return deferred.promise;
	        	}
	        }
    })
})