import { Meteor } from 'meteor/meteor';
import { Thumbs, Images } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('thumbsById', function(ids) {
    return Thumbs.find({
      originalStore: 'images',
      originalId: {
        $in: ids
      }
    });
  });
 
  Meteor.publish('thumbs', function() {
    return Thumbs.find({});
  });

  Meteor.publish('images', function() {
    return Images.find({});
  });
}