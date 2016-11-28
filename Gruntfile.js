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
            src: [
              '.tmp',
              'dist/*',
              '!dist/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },
    less: {
      dist: {
        files: {
          'app/styles/main.css': [ 'dist/styles/main.less' ]
        },
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
            cwd: 'dist',
            src: 'app/**/*.js',
            dest: 'dist'
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist',
            src: [
              '{fonts,scripts,vendor}/**/*'
            ]
          }
        ]
      }
    }
  };
});
