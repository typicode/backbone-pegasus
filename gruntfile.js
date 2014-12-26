module.exports = function(grunt) {

  grunt.initConfig({
    bower: grunt.file.readJSON('bower.json'),
    shell: {
      getPegasus: {
        command: 'bower install pegasus'
      }
    },
    concat: {
      dist: {
        src: ['bower_components/pegasus/dist/pegasus.js', 'src/index.js'],
        dest: 'dist/<%= bower.name %>.js'
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        banner: '/* <%= bower.version %> */\n'
      },
      dist: {
        files: {
          'dist/<%= bower.name %>.min.js': 'dist/<%= bower.name %>.js'
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
        expand: true,
        flatten: true,
        src: ['dist/<%= bower.name %>.js', 'dist/<%= bower.name %>.min.js'],
        dest: 'example/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['jshint', 'shell:getPegasus', 'concat', 'uglify', 'copy']);
  grunt.registerTask('default', 'watch');

};