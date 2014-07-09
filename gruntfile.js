module.exports = function(grunt) {

  grunt.initConfig({
    bower: grunt.file.readJSON('bower.json'),
    concat: {
      dist: {
        src: ['bower_components/pegasus/pegasus.js', 'src/index.js'],
        dest: '<%= bower.name %>.js'
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        banner: '/* <%= bower.version %> */\n'
      },
      dist: {
        files: {
          '<%= bower.name %>.min.js': '<%= bower.name %>.js'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/index.js']
    },
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'build',
      options: {
        atBegin: true
      }
    },
    copy: {
      main: {
        src: ['<%= bower.name %>.js', '<%= bower.name %>.min.js'],
        dest: 'example/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'copy']);
  grunt.registerTask('default', 'watch');

};