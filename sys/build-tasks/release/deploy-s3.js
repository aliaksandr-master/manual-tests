/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const fse = require('fs-extra');
const gulp = require('gulp');
const fmap = require('../../gulp-utils/fmap');
const gulpGzip = require('gulp-gzip');
const gulpFilter = require('gulp-filter');
const gulpUploadNewS3 = require('../../gulp-tasks/gulp-upload-new-s3');
const secret = require('../../utils/secret');
const options = require('../../config');

module.exports = (callback) => {
  fse.ensureDirSync(options.DIR_S3_CACHE);

  const filterGzipFiles = gulpFilter([ '**/*.{css,js}' ], { restore: true });

  const awsSettings = secret.get(options.ENV).aws;

  return gulp
    .src(fmap(options.DIR_RELEASED, [
      '**/*',
      '!**/' + options.REV_MANIFEST_FILE,
      '!**/*' + options.BEM_STAT_SUF
    ]))

    .pipe(filterGzipFiles)
    .pipe(gulpGzip())
    .pipe(filterGzipFiles.restore)

    .pipe(gulpUploadNewS3({
      onlyNew: options.ENV !== 'prod',
      cache: options.FILE_S3_CACHE,
      headers: { 'Cache-Control': 'max-age=864000, s-maxage=864000, must-revalidate' },
      aws: {
        key: awsSettings.accessKeyId,
        secret: awsSettings.secretAccessKey,
        bucket: awsSettings.bucket
      }
    }));
};
