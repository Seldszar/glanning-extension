module.exports = (grunt) ->

	require("load-grunt-tasks") grunt
	grunt.loadTasks "tasks"

	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"

		clean:
			output:
				src: ["app/tmp", "app/output"]

		bump:
			options:
				files: ["package.json", "app/src/common/extension_info.json"]
				updateConfigs: ["pkg"]
				commitMessage: "Mise à jour de la version des fichiers"
				commitFiles: ["package.json", "app/src/common/extension_info.json"]
				createTag: false
				push: false

		watch:
			dist:
				files: ["app/src/**/*"]
				tasks: ["default"]
				options:
					atBegin: true

		coffee:
			development:
				options:
					bare: true
					# sourceMap: true
				files: [
					expand: true
					cwd: "app/src"
					src: ["**/*.coffee"]
					dest: "app/tmp/src"
					ext: ".js"
				]
			production:
				options:
					bare: true
				files: [
					expand: true
					cwd: "app/src"
					src: ["**/*.coffee"]
					dest: "app/tmp/src"
					ext: ".js"
				]

		jade:
			development:
				options:
					pretty: true
					data:
						debug: true
				files: [
					expand: true
					cwd: "app/src"
					src: ["**/*.jade"]
					dest: "app/tmp/src"
					ext: ".html"
				]
			production:
				options:
					pretty: true
					data:
						debug: false
				files: [
					expand: true
					cwd: "app/src"
					src: ["**/*.jade"]
					dest: "app/tmp/src"
					ext: ".html"
				]

		less:
			options:
				plugins: [
					new (require("less-plugin-autoprefix")) { browsers : ["last 2 versions"] }
				]
			dist:
				files: [
					expand: true
					cwd: "app/src"
					src: ["**/*.less"]
					dest: "app/tmp/src"
					ext: ".css"
				]

		copy:
			dist:
				files: [
					expand: true
					cwd: "app/src"
					src: ["**", "!**/*.less", "!**/*.jade", "!**/*.coffee"]
					dest: "app/tmp/src"
				]

		uglify:
			options:
				mangle:
					except: ["angular", "kango"]
				preserveComments: "some"
			dist:
				files: [
					expand: true
					cwd: "app/tmp"
					src: "**/*.js"
					dest: "app/tmp"
				]

		cssmin:
			dist:
				files: [
					expand: true
					cwd: "app/tmp"
					src: "**/*.css"
					dest: "app/tmp"
				]

		kango:
			dist:
				options:
					tmp: "app/tmp"
			publish:
				options:
					tmp: "app/tmp"
					pack: true

	grunt.registerTask "default", ["coffee:development", "jade:development", "less", "copy", "kango:dist"]
	grunt.registerTask "publish", ["clean", "coffee:production", "jade:production", "less", "copy", "uglify", "cssmin", "kango:publish"]
	grunt.registerTask "publish:release", ["bump:minor", "publish"]
	grunt.registerTask "publish:hotfix", ["bump", "publish"]
