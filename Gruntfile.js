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

        postcss: {
            options: {
                map: false, 
                processors: [
                    require('autoprefixer')({ browsers: 'last 8 versions' })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>sass/',
                    src: ['*.js'],
                    dest: '<%= settings.distPath %>css/'
                }]
            }
        },

        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>js/',
                    src: ['*.js'],
                    dest: '<%= settings.distPath %>js/'
                }]
            }
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.distPath %>js/',
                    src: ['*.js'],
                    dest: '<%= settings.distPath %>js/'
                }]
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
                    dest: ''
                }]
            }
        },

        watch: {
            javascript: {
                expand: true,
                files: ['<%= settings.srcPath %>js/**/*.js', 'Gruntfile.js'],
                tasks: ['babel', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                expand: true,
                files: ['<%= settings.srcPath %>sass/**/*.scss'],
                tasks: ['sass', 'postcss'],
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
    grunt.registerTask('build', ['sass', 'postcss', 'uglify', 'babel', 'htmlmin']);

};
