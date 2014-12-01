module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			output: {
				src: ['app/tmp', 'app/output']
			}
		},
		bump: {
			options: {
				files: ['package.json', 'app/src/common/extension_info.json'],
				updateConfigs: ['pkg'],
				commitMessage: 'Mise à jour de la version des fichiers',
				commitFiles: ['package.json', 'app/src/common/extension_info.json'],
				createTag: false,
				push: false
			}
		},
		watch: {
			dist: {
				files: ['app/src/**/*'],
				tasks: ['default'],
				options: {
					atBegin: true
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/src',
					src: ['**', '!**/*.styl', '!**/*.coffee'],
					dest: 'app/tmp/src',
				}]
			}
		},
		uglify: {
			options: {
				mangle: {
					except: ['angular', 'kango']
				}
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'app/tmp',
					src: '**/*.js',
					dest: 'app/tmp'
				}]
			}
		},
		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/tmp',
					src: '**/*.css',
					dest: 'app/tmp'
				}]
			}
		},
		kango: {
			dist: {
				options: {
					tmp: 'app/tmp'
				}
			},
			publish: {
				options: {
					tmp: 'app/tmp',
					pack: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['copy', 'kango:dist']);
	grunt.registerTask('publish', ['clean', 'copy', 'uglify', 'cssmin', 'kango:publish']);
	grunt.registerTask('publish:release', ['bump:minor', 'publish']);
	grunt.registerTask('publish:hotfix', ['bump', 'publish']);

};
