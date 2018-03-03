module.exports = function (grunt) {
    var path = "";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            app: 'temp_app',
            js: 'js',
            build: '.build',
            html: 'html'
        },
        clean: {
            temp_app: ['temp_app/**/*'],
            build: ['.build/**/*']
        },
        copy: {
            files: {
                cwd: 'app',
                src: '**/*',
                dest: 'temp_app',
                expand: true
            }
        },
        durandal: {
            dist: {
                src: [
                    'temp_app/**/*.*',
                    'javaScript/durandal/**/*.*'
                ]
            },
            options: {
                name: '../javaScript/durandal-almond/almond',
                baseUrl: '<%= paths.app %>/',
                mainPath: '<%= paths.app %>/main.js',
                out: '<%= paths.build %>/<%= paths.js %>/app.js',

                paths: {
                    'config': 'config',
                    'services': 'services',
                    'resources': 'resources',
                    'permissions': 'permissions',
                    'documentDefenition': 'documentDefenition',
                    'durandal': '../javaScript/durandal',
                    'plugins': '../javaScript/durandal/plugins',
                    'transitions': '../javaScript/durandal/transitions',
                    'text': '../javaScript/require/text',
                    'gapi': '../javaScript/googleApi/client',
                    'almond': '../javaScript/durandal-almond/almond'
                },

                shim: {
                    'gapi': {
                        exports: 'gapi'
                    }
                },

                uglify2: {
                    compress: {
                        global_defs: {
                            DEBUG: true
                        }
                    }
                }
            }
        },
        concat: {
            scripts: {
                src: [
                    'lib/jquery-2.1.1.js',
                    'lib/underscore.js',
                    'lib/calendar.js',
                    'lib/jquery-ui-1.11.1.js',
                    'lib/dropzone.js',
                    'lib/jquery.validate.js',
                    'lib/select2.js',
                    'lib/bootstrap.js',
                    'lib/bootstrap-editable.js',
                    'lib/bootstrap-datepicker.js',
                    'lib/jquery.bootstrap.wizard.js',
                    'lib/app.config.js',
                    'lib/SmartNotification.js',
                    'lib/jarvis.widget.js',
                    'lib/app.js',
                    'lib/jquery.mb.browser.js',
                    'lib/fastclick.js',
                    'lib/summernote.js',
                    'lib/knockout-3.2.0.js',
                    'lib/knockout-mapping.min.js',
                    'lib/nicescroll.min.js',
                    'lib/nicescroll.plus.js',
                    'lib/moment.min.js',
                    'lib/daterangepicker.js',
                    'lib/core-min.js',
                    'lib/enc-base64-min.js',
                    'lib/highslide-full.min.js',
                    'lib/highslide.config.js',
                    'lib/highcharts.js',
                    'lib/data.js',
                    'lib/exporting.js',
                    'lib/dark-unica.js',
                    'lib/linq.min.js',
                    'lib/FileSaver.js',
                    'lib/jszip.js',
                    'lib/jspdf.min.js',
                    'lib/jspdf.plugin.autotable.js',
                    'lib/bootstrap-timepicker.js',
                    'lib/bootstrap-progressbar.js',
                    'lib/jquery.nestable.js',
                    'lib/jquery.scrollbar.js',
                    'lib/koGrid-2.1.1.js',
                    'lib/slick.min.js',
                    'lib/datepicker-ranger.js',
                    'lib/bootstrap-switch.min.js',
                    'lib/knockout.x-editable.min.js',
                    'lib/knockout-validation.js',
                    'lib/socket.io-1.2.0.js',
                    'lib/emojify.min.js',
                    'lib/jquery-hemi-intro.js',
                    'lib/gridstack.min.js'
                ],
                dest: '<%= paths.build %>/<%= paths.js %>/libs.js'
            },
            all: {
                src: ['<%= paths.build %>/<%= paths.js %>/libs.min.js', '<%= paths.build %>/<%= paths.js %>/app.js'],
                dest: '<%= paths.build %>/<%= paths.js %>/libs-app.js'
            }
        },
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": false
                    }
                }
            },
            my_target: {
                files: {
                    '.build/js/libs.min.js': ['.build/js/libs.js']
                }
            },
            viewmodels: {
                files: [{
                    expand: true,
                    cwd: 'temp_app/viewmodels',
                    src: '**/*.js',
                    dest: '.build/viewmodels'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'app/views',
                src: '**/*.html',
                dest: 'temp_app/views'
            }
        },
        jsonlint: {
            lintDocDefenition: {
                src: ['app/documentDefenition.json']
            }
        },
        jshint: {
            all: {
                src: ['app/*.js']
            }
        },
        watch: {
            scripts: {
                files: ['app/**/*js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-durandal');

    grunt.registerTask('default', ['clean:temp_app', 'clean:build', 'copy', 'htmlmin:dist', 'durandal', 'concat:scripts', 'uglify:my_target']);
    grunt.registerTask('jsonlint-doc-def', ['jsonlint:lintDocDefenition']);
    grunt.registerTask('scripts-concat-minify', ['concat:scripts', 'uglify:my_target']);
    grunt.registerTask('viewmodels-minify', ['uglify:viewmodels']);
    grunt.registerTask('concat-all', ['concat:all']);

    grunt.event.on('watch', function (action, filepath) {
        grunt.config('jshint.all.src', filepath);
    });
}