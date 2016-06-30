import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyAdd.html';
import { name as PartyUpload } from '../partyUpload/partyUpload';
import { Parties } from '../../../api/parties';

class PartyAdd {
  constructor() {
    this.party = {};
  }

  submit() {
    this.party.owner = Meteor.user()._id;
    this.party.public = false;
    Parties.insert(this.party);
    this.reset();
  }

  reset() {
    this.party = {};
  }
}

const name = 'partyAdd';

// create a module
export default angular.module(name, [
  angularMeteor,
  PartyUpload
]).component(name, {
  templateUrl:template,
  controllerAs: name,
  controller: PartyAdd
});
