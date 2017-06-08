var keystone = require('keystone');

/**
 * Image Gallery Model
 * ==================
 */

var ImageGalleryModel = new keystone.List('ImageGalleryModel');

ImageGalleryModel.add({
  altTag: { type: String },
  attributes: { type: String },
  height: { type: Number },
  width: { type: Number },
  imageName: { type: String },
  parentGUID: { type: String },
  thumbnailGUID: { type: String },
  urlThumbnail: { type: String },
  urlParent: { type: String },
  title: { type: String },
  content1: { type: String },
  content2: { type: String },
  content3: { type: String },
  content4: { type: String }
});

ImageGalleryModel.register();
