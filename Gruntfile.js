'use strict';

var path = require('path');
var fse = require('fs-extra');
var grunto = require('grunto');
var NwBuilder = require('nw-builder');

module.exports = grunto(function (grunt) {
  var DIR_CWD = __dirname;
  var SRC_DIR = 'app';
  var BUILD_DIR = '.tmp/build';
  var CACHE_DIR = '.tmp/nw-cache';
  var ENV = process.env.NODE_ENV || 'development';
  var RELEASE_DIR = '.tmp/release-' + ENV;

  grunt.registerTask('build-nw', function () {
    const done = this.async();

    fse.ensureDirSync(path.join(DIR_CWD, RELEASE_DIR));
    fse.ensureDirSync(path.join(DIR_CWD, CACHE_DIR));

    var nw = new NwBuilder({
      buildDir: path.join(DIR_CWD, RELEASE_DIR),
      flavor: ENV === 'production' ? 'normal' : 'sdk',
      buildType: 'timestamped',
      cacheDir: path.join(DIR_CWD, CACHE_DIR),
      files: [
        `${BUILD_DIR}/**/*`
      ],
      platforms: [ 'win32'/*, 'win64'*/ ]
    });

    nw.on('log',  console.log);

    nw.build()
      .then(function () {
        console.log('all done!');
        done();
      }, function (err) {
        console.error(err);
        done(err);
      });
  });

  grunt.registerTask('default', [
    'clean:dist',
    'copy:dist',
    'less:dist',
    'build-nw'
  ]);

  return {
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: BUILD_DIR
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: SRC_DIR,
            dest: BUILD_DIR,
            src: [
              '**/*',
              '!**/*.less'
            ]
          }
        ]
      }
    },
    less: {
      dist: {
        files: [
          {
            expand: true,
            cwd: SRC_DIR,
            src: 'styles/main.less',
            dest: BUILD_DIR,
            ext: '.css'
          }
        ],
        options: {
          compress: false,
          sourceMap: false,
          sourceMapBasepath: SRC_DIR + '/',
          sourceMapRootpath: '/'
        }
      }
    }
  };
});
