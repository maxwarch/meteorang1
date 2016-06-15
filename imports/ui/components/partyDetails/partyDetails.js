import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './partyDetails.html';

class PartyDetails {
  constructor($stateParams) {
    'ngInject';
    this.partyId = $stateParams.partyId;
  }
}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
])

.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('details', {
      parent:'parties',
      name:'parties.details',
      url: '/:partyId',
      templateUrl: template,
      controllerAs: name,
      controller: PartyDetails
  });
})
