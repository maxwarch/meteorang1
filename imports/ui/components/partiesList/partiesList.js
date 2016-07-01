import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './partiesList.html';
import { name as PartyDetails } from '../partyDetails/partyDetails';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyImage } from '../partyImage/partyImage';

import { name as partiesService } from '../../../api/parties/parties.service';

class PartiesList {
  constructor($scope, $reactive, $state, $rootScope, partiesService) {
    'ngInject';

    $rootScope.$state = $state;
    this.partiesService = partiesService;
    $reactive(this).attach($scope);

    this.helpers({
      parties() {
        return partiesService.getParties();
      },
      myId(){
        return Meteor.userId();
      },
      
    });
  }

/*  auteur(id){
    return this.partiesService.getAuteur(id);
  }

  thumbs(postId){
    console.log(postId)
    return this.partiesService.getThumbs(postId);
  }*/

  setPrivate(party){
    this.partiesService.setPrivate(party);
  }

  remove(party) { 
    this.partiesService.remove(party);
  }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartyAdd,
  PartyDetails,
  partiesService,
  PartyImage
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('parties', {
        url: '/parties',
        controllerAs: name,
        controller: PartiesList,
        templateUrl: template
    })
})