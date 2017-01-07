module.exports = function(grunt) {

    grunt.initConfig({

        settings: {
            srcPath: 'src/',
            distPath: 'dist/'
        },

        sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>sass',
                    src: ['**/*.scss'],
                    dest: '<%= settings.distPath %>css',
                    ext: '.css'
                }],
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false,
                    precision: 5
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    '<%= settings.distPath %>js/jScrolly.js': '<%= settings.srcPath %>js/jScrolly.js'
                } 
            }
        },

        htmlmin: {
            dist: { 
              options: {  
                removeComments: true,
                collapseWhitespace: true
              },
              files: [{
                    expand: true, 
                    cwd: '<%= settings.srcPath %>', 
                    src: ['**/*.html'], 
                    dest: '<%= settings.distPath %>'
                }]
            }
        },

        watch: {
            javascript: {
                expand: true,
                files: ['<%= settings.srcPath %>js/**/*.js', 'Gruntfile.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            scss: {
                expand: true,
                files: ['<%= settings.srcPath %>sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['<%= settings.srcPath %>*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'uglify', 'htmlmin']);

};
