'use strict';

module.exports = function(grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		banner: '/*!\n<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? pkg.homepage + "\\n" : "" %>' +
			'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>'+ '\n*/\n\n',

		// concatentate javascript files -------------
		concat: {
			all: {
				src: ['resources/js/lib/**/*.js', 'resources/js/main.js', 'resources/js/**/*.js'],
				dest: 'public/js/main.js'
			},
		},

		// copy files to public ----------------------
		copy: {
			html: {
				expand: true,
			    cwd: 'app/',
			    src: '**',
			    dest: 'public/',
			    filter: 'isFile'
			},
			fonts: {
				expand: true,
				cwd: 'resources/fonts/',
				src: '**',
				dest: 'public/fonts',
			},
			images: {
				expand: true,
				cwd: 'resources/images/',
				src: '**',
				dest: 'public/images',
			},
			robots: {
				src: 'robots.txt',
				dest: 'public/robots.txt'
			}
		},

		// concatenate bower components --------------
		bower_concat: {
			all: {
				dest: 'public/js/vendor.js'
			}
		},

		// minify javascript file --------------------
		uglify: {
			main: {
				src: '<%= concat.all.dest %>',
				dest: '<%= concat.all.dest %>',
				options: {
					banner: '<%= banner %>'
				}
			},
			vendor: {
				src: '<%= bower_concat.all.dest %>',
				dest: '<%= bower_concat.all.dest %>'
			}
		},

		// javascript linting ------------------------
		jshint: {
			options: {
				curly: true,        // require {} braces around blocks
				eqeqeq: true,       // require use of === and !== equality comparison to prevent value coercion
				eqnull: true,       // suppress warnings about == null comparisons
				immed: true,	    // require immediate function invocations be wrapped in parenthesis
				latedef: true,      // require variable be defined before use
				newcap: true,       // require constructor functions be capitalized
				noarg: true,        // prohibit use of arguments.caller and arguments.callee for optimization reasons
				undef: true,	    // requires all variable be properly declared
				unused: "vars",     // warns about unused variables
				sub: true           // allow access objects w/ ['name'] notation -- necessary as some returned objects violate camelcase
			},

			// client side dev
			dev: {
				options: {
					browser: true,     // define globals exposed by browsers (document, navigator, FileReader, etc)
					devel: true,       // define globals for console and alert
					globals: {
						pocketBetaApp: true,
						angular: true,     // define globals used by Angular
						Firebase: true	   // define globals used by Firebase
					}
				},
				files: {
					src: ['resources/js/**/*.js']
				}
			},

			// client side prod
			prod: {
				options: {
					browser: true,     // define globals exposed by browsers (document, navigator, FileReader, etc)
					globals: {
						pocketBetaApp: true,
						angular: true,     // define globals used by Angular
						Firebase: true	   // define globals used by Firebase
					}
				},
				files : {
					src: ['resources/js/**/*.js']
				}
			}
		},

		// compile sass to css -----------------------
		sass: {
			dev: {
				files: {
					"public/css/main.css": "resources/scss/main.scss"
				}
			},
			prod: {
				options: {
					style: "compressed"
				},
				files: {
					"public/css/main.css": "resources/scss/main.scss"
				}
			}
		},

		livereload  : {
			options   : {
				base    : 'public',
			},
			files     : ['public/**/*']
		},

		// watch files for changes -------------------
		watch: {
			options: {
				livereload: true
			},

			html: {
	            files: ['app/*.html','app/**/*.html','**/*.css'],
				tasks: ['copy:html']
	        },

			css: {
				files: ['resources/scss/**/*.scss'],
				tasks: ['sass:dev']
			},

			js: {
				files: ['resources/js/**/*.js'],
				tasks: ['jshint:dev','concat']
			}
		},

		// open browser app ------------------
		open : {
			dev : {
				path: 'http://localhost:3000',
				delay: 1000
			}
		}
	});

	// default task
	grunt.registerTask('default', ['concat', 'copy', 'bower_concat', 'sass:dev', 'open', 'watch', 'livereload']);

	// production task.
	grunt.registerTask('build', ['jshint:prod', 'concat', 'copy', 'bower_concat', 'uglify', 'sass:prod']);

};
