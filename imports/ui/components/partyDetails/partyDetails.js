import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './partyDetails.html';

import { Parties, Auteurs } from '../../../api/parties/index';

class PartyDetails {
  constructor($stateParams, $scope, $reactive, p) {
    'ngInject';

    $reactive(this).attach($scope);
    
    this.subscribe('parties');

    this.helpers({
      party(){
        console.log(Parties.findOne($stateParams.partyId))
        return Parties.findOne($stateParams.partyId); 
      }
    });
  }

  auteur(id){
    return Auteurs.findOne(id); 
  }
}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
])

.config(function($stateProvider, $q) {
  'ngInject';

  $stateProvider.state('details', {
      parent:'parties',
      url: '/:partyId',
      templateUrl: template,
      controllerAs: name,
      controller: PartyDetails,
      resolve:{
        p:function($q){
          var deferred = $q.defer();
   
          Meteor.subscribe('parties', {
            onReady: deferred.resolve,
            onStop: deferred.reject
          });
     
          return deferred.promise;
        }
      }
  });
})
