'use strict';

var grunto = require('grunto');

module.exports = grunto(function (grunt) {

  grunt.registerTask('default', [
    'clean:dist',
    'copy:dist',
    'less:dist',
    'uglify:dist'
  ]);

  var SRC_DIR = 'app';
  var BUILD_DIR = '.tmp/release';

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
          compress: true,
          sourceMap: false,
          sourceMapBasepath: SRC_DIR + '/',
          sourceMapRootpath: '/'
        }
      }
    },
    uglify: {
      dist: {
        files: [
          {
            expand: true,
            replace: true,
            cwd: BUILD_DIR,
            src: [ '**/*.js' ],
            dest: BUILD_DIR
          }
        ]
      }
    }
  };
});
