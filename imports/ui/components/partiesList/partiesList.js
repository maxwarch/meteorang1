import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './partiesList.html';
import templateDetails from '../partyDetails/partyDetails.html';
import { name as PartyDetails } from '../partyDetails/partyDetails';
import { name as PartyAdd } from '../partyAdd/partyAdd';

import { Parties } from '../../../api/parties/index';

class PartiesList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    
    this.subscribe('parties', function(d){
      console.log(Parties.find().fetch())
    });
    
    this.myId = Meteor.userId();

    this.helpers({
      parties() {
        
        return Parties.find();
      }
    });
  }

  setPrivate(party){
    Parties.update(party._id, {$set:{public : party.public}});
  }

  remove(party) { 
    if (party) {
      Parties.remove(party._id);
    }
  }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartyAdd,
  PartyDetails
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