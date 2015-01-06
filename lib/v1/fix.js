/**
 * Fix body
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

/**
 * Fix integer
 */

function integer(data) {
  if (!data) return;

  var l = arguments.length;

  for (var i = 1; i < l; i++) {
    var key = arguments[i];
    var value = data[key];

    if (value !== undefined && value !== null) {
      data[key] = parseInt(value, 10);
    }
  }
}

/**
 * Fix object value
 */

function applyObject(data, func) {
  if (!data) return;

  var l = arguments.length;

  for (var i = 2; i < l; i++) {
    var key = arguments[i];

    if (data.hasOwnProperty(key)) {
      data[key] = func(data[key]);
    }
  }
}

/**
 * Fix image size
 */

function imageSize(data) {
  integer(data, 'width', 'height', 'file_size_kb');
}

/**
 * Fix image
 */

function image(data) {
  if (!data) return data;

  integer(data,
    'photo_id',
    'illustration',
    'r_rated',
    'enhanced_license_available',
    'is_vector',
    'submitter_id'
  );

  lodash.each(data.categories, function(category) {
    integer(category, 'category_id');
  });

  lodash.each(data.sizes, imageSize);

  return data;
}

/**
 * Fix image download
 */

function imageDownload(data) {
  if (!data) return data;

  integer(data, 'photo_id', 'allotment_charge');

  return data;
}

/**
 * Fix image result
 */

function imageSearchResult(data) {
  if (!data) return data;

  integer(data,
    'photo_id',
    'thumb_large_height',
    'thumb_large_width',
    'thumb_small_height',
    'thumb_small_width'
  );

  applyObject('thumb_large', 'preview', 'thumb_small', imageSize);

  return data;
}

/**
 * Fix video result
 */

function videoSearchResult(data) {
  if (!data) return data;

  integer(data,
    'video_id',
    'submitter_id'
  );

  return data;
}

/**
 * Fix search
 */

function search(data, media) {
  if (!data) return data;

  integer(data, 'count', 'page');

  if (data.results) {
    data.results = data.results.map(media);
  }

  return data;
}

/**
 * Fix image search
 */

function imageSearch(data) {
  return search(data, imageSearchResult);
}

/**
 * Fix image search
 */

function videoSearch(data) {
  return search(data, videoSearchResult);
}

/**
 * Fix lightbox
 */

function lightbox(data) {
  if (!data) return data;

  integer(data,
    'lightbox_id',
    'confirmed',
    'image_count'
  );

  lodash.each(data.categories, function(category) {
    integer(category, 'category_id');
  });

  lodash.each(data.sizes, imageSize);

  return data;
}

/**
 * Lightbox list
 */

function lightboxList(data) {
  return lodash.map(data, lightbox);
}

/**
 * Fix video size
 */

function videoSize(data) {
  integer(data, 'width', 'height', 'file_size_kb');
}

/**
 * Fix video
 */

function video(data) {
  if (!data) return data;

  integer(data,
    'video_id',
    'r_rated',
    'submitter_id'
  );

  lodash.each(data.categories, function(category) {
    integer(category, 'category_id');
  });

  lodash.each(data.sizes, videoSize);

  return data;
}

/**
 * Fix video download
 */

function videoDownload(data) {
  if (!data) return data;

  integer(data, 'video_id', 'allotment_charge');

  return data;
}

/**
 * Module exports.
 */

exports.image = image;
exports.imageDownload = imageDownload;
exports.imageSearch = imageSearch;
exports.lightbox = lightbox;
exports.lightboxList = lightboxList;
exports.video = video;
exports.videoDownload = videoDownload;
exports.videoSearch = videoSearch;
