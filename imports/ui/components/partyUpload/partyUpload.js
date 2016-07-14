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
				return Thumbs.find({
					originalStore: 'images',
					originalId: {
						$in: this.getReactively('files', true) || []
					}
				});
			}
		});
	}

	addImages(files) {
		if (files.length) {
			this.images = this.images || [];
			_.each(files, this.$bindToContext((file) => {
				this.currentFile = file;

				const reader = new FileReader;

				reader.onload = this.$bindToContext((e) => {
					this.images.push({file:this.currentFile, cropImgSrc:e.target.result, myCroppedImage:''});
				});

				reader.readAsDataURL(file);
			}));

		} else {
			this.images = null;
		}
	}

	save() {
		let countFile = 0;
		_.each(this.images, this.$bindToContext((file) => {
			upload(file.myCroppedImage, file.file.name,
				this.$bindToContext((file, progress) => {
					//console.log(file, progress)
				}),
				this.$bindToContext((file) => {
					this.uploaded.push(file);
					if (!this.files || !this.files.length) {
						this.files = [];
					}
					this.files.push(file._id);
					countFile++;
					if(countFile == this.images.length) this.reset();
				}), 
				(e) => {
					console.log('Oops, something went wrong', e);
				});
		}))
	}

	reset() {
		this.images = null;
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