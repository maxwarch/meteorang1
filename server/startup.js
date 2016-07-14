import { Meteor } from 'meteor/meteor';
import { Parties } from '../imports/api/parties';
import { Users } from '../imports/api/users';
import '../imports/api/images';
import '../imports/api/chat';
import { Alertes } from '../imports/api/alertes';

Meteor.startup(() => {
  /*if (Parties.find().count() === 0) {
    const parties = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!'
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.'
    }];

    parties.forEach((party) => {
      Parties.insert(party)
    });
  }*/
});

Meteor.methods({
  getUser:(id) => {
    let data = Meteor.users.findOne({_id:id});
    if(!!data){
      return data
    }else{
      throw new Meteor.Error('nouser');
    } 
  },

  setAlertesRead: (channelid, userid) => {
    //console.log(channelid, userid);
    Alertes.update({ 'options.channelId':channelid, userId: userid }, { $set:{ status:'read' } }, { multi:true });
  }
});

Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   _.extend(user.profile, options.profile);
   return user;
});