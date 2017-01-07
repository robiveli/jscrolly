module.exports = function(grunt) {

    grunt.initConfig({

        settings: {
            srcPath: 'src/',
            distPath: 'dist/'
        },

        postcss: {
            options: {
                map: false, 
                processors: [
                    require('pixrem')(),
                    require('autoprefixer')({ browsers: 'last 5 versions' })
                ]
            },
            dist: {
              src: '<%= settings.distPath %>css/*.css'
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
            postcss: {
                expand: true,
                files: ['<%= settings.srcPath %>sass/**/*.scss'],
                tasks: ['postcss'],
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
    grunt.registerTask('build', ['postcss', 'uglify', 'htmlmin']);

};
