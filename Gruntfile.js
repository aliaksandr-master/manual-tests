'use strict';

var grunto = require('grunto');

module.exports = grunto(function (grunt) {

  grunt.registerTask('default', [
    'clean:dist',
    'copy:dist',
    'less',
    'uglify',
    'copy'
  ]);

  return {
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: '.tmp'
          }
        ]
      },
      server: '.tmp'
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'app',
            dest: '.tmp/release',
            src: '**/*'
          }
        ]
      }
    },
    less: {
      dist: {
        files: [
          {
            src: 'app/styles/main.less',
            dest: '.tmp/release/styles/main.css'
          }
        ],
        options: {
          compress: true,
          sourceMap: false,
          sourceMapBasepath: 'app/',
          sourceMapRootpath: '/'
        }
      }
    },
    uglify: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/release',
            src: 'app/**/*.js',
            dest: '.tmp/release'
          }
        ]
      }
    }
  };
});
