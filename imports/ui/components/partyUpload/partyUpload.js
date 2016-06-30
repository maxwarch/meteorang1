import angular from 'angular';
import angularMeteor from 'angular-meteor'; 
import { Meteor } from 'meteor/meteor';
import ngFileUpload from 'ng-file-upload';
import 'angular-sortable-view';
import { Thumbs, upload, Images } from '../../../api/images';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';
 
import template from './partyUpload.html';
 
class PartyUpload {
  constructor($scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    this.uploaded = [];

    this.subscribe('thumbs', () => [
      this.getReactively('files', true) || []
    ]);
 
    this.helpers({
      thumbs() {
        /*var d =  Thumbs.find({
          originalStore: 'images',
          originalId: {
            $in: this.getReactively('files', true) || []
          }
        });*/
       	var d = Images.find({_id:{$in:this.getReactively('files', true) || []}})
        return d;
      }
    });
  }
 
  addImages(files) {
    if (files.length) {
      this.currentFile = files[0];
 
      const reader = new FileReader;
 
      reader.onload = this.$bindToContext((e) => {
        this.cropImgSrc = e.target.result;
        this.myCroppedImage = '';
      });
 
      reader.readAsDataURL(files[0]);
    } else {
      this.cropImgSrc = undefined;
    }
  }

   save() {
    upload(this.myCroppedImage, this.currentFile.name, this.$bindToContext((file) => {
      this.uploaded.push(file);
      if (!this.files || !this.files.length) {
        this.files = [];
      }
      this.files.push(file._id);
      this.reset();
    }), (e) => {
      console.log('Oops, something went wrong', e);
    });
  }
 
  reset() {
    this.cropImgSrc = undefined;
    this.myCroppedImage = '';
  }
}
 
const name = 'partyUpload';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ngFileUpload,
  'angular-sortable-view',
  'ngImgCrop'
]).component(name, {
  templateUrl:template,
  bindings: {
    files: '=?'
  },
  controllerAs: name,
  controller: PartyUpload
});