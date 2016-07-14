import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './partyDetails.html';

import { name as partiesService } from '../../../api/parties/parties.service';

class PartyDetails {
  constructor($stateParams, $scope, $reactive, partiesService) {
    'ngInject';

    this.$stateParams = $stateParams;
    this.partiesService = partiesService;

    $reactive(this).attach($scope);

    this.helpers({
      party(){
        return partiesService.getParties($stateParams.partyId); 
      },
      images(){
        if(ids = partiesService.getParties($stateParams.partyId))
          return partiesService.getImages(ids.images);
      }
    });
  }

  auteur(id){
    return this.partiesService.getAuteur(id); 
  }
}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  partiesService
])

.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('details', {
      parent:'parties',
      url: '/:partyId',
      templateUrl: template,
      controllerAs: name,
      controller: PartyDetails,
      /*resolve:{
        p:function($q){
          var deferred = $q.defer();
   
          Meteor.subscribe('parties', {
            onReady: deferred.resolve,
            onStop: deferred.reject
          });
     
          return deferred.promise;
        }
      }*/
  });
})
