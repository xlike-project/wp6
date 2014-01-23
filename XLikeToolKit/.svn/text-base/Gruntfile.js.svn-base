module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: 'build/jquery.<%= pkg.name %>.js.map'
      },
      build: {
        src: 'build/jquery.<%= pkg.name %>.js',
        dest: 'build/jquery.<%= pkg.name %>.min.js'
      }
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'src/**/*.js'],
        dest: 'build/jquery.<%= pkg.name %>.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      beforeconcat: ['src/**/*.js'],
      afterconcat: ['build/jquery.<%= pkg.name %>.js']
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src/',
          //themedir: 'path/to/custom/theme/',
          outdir: 'docs/'
        }
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  // Default task(s).
  grunt.registerTask('default', ['jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'yuidoc', 'uglify']);
};