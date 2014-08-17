module.exports = (grunt) ->

	[
		'grunt-contrib-clean'
		'grunt-contrib-coffee'
		'grunt-contrib-concat'
		'grunt-contrib-jasmine'
		'grunt-contrib-sass'
		'grunt-contrib-watch'
		'grunt-coveralls'
		'grunt-html2js'
		'grunt-ngmin'
		'grunt-browserify'
	]
	.forEach grunt.loadNpmTasks

	# task sets
	build = ['html2js', 'browserify', 'ngmin', 'concat', 'sass', 'clean']
	test = ['html2js', 'browserify', 'coffee', 'jasmine:unit']
	testAndBuild = ['html2js', 'browserify', 'coffee', 'jasmine:unit', 'ngmin', 'concat', 'sass', 'clean']
	run = ['default', 'watch']

	# task defs
	grunt.initConfig

		pkg: grunt.file.readJSON 'package.json'

		clean:
			main: [
				'./dist/template.js'
			]

		coffee:
			compile:
				files:
					'test/unit.js': 'test/unit.coffee'

		concat:
			main:
				src: ['./dist/pokerGame.js', './dist/template.js']
				dest: './dist/pokerGame.js'

		coveralls:
			options:
				force: true
			main:
				src: 'reports/lcov/lcov.info'

		html2js:
			main:
				src: './src/html/*.html'
				dest: './dist/template.js'
			options:
				base: './src/html'
				module: 'pokerGameTemplate'

		jasmine:
			coverage:
				src: [
					'./src/pokerGame.js'
				]
				options:
					specs: ['./test/unit.js']
					template: require 'grunt-template-jasmine-istanbul'
					templateOptions:
						coverage: 'reports/lcov/lcov.json'
						report: [
							{
								type: 'html'
								options:
									dir: 'reports/html'
							}
							{
								type: 'lcov'
								options:
									dir: 'reports/lcov'
							}
						]
					type: 'lcovonly'
					vendor: [
						'./bower_components/lodash/dist/lodash.js'
						'./bower_components/angular/angular.js'
						'./bower_components/angular-mocks/angular-mocks.js'
						'./dist/template.js'
					]
			unit:
				src: './dist/pokerGame.js'
				options:
					specs: './test/unit.js'
					vendor: [
						'./bower_components/lodash/dist/lodash.js'
						'./bower_components/angular/angular.js'
						'./bower_components/angular-mocks/angular-mocks.js'
						'./dist/template.js'
					]
					keepRunner: true

		ngmin:
			main:
				src: ['./dist/pokerGame.js']
				dest: './dist/pokerGame.js'

		sass:
			main:
				files:
					'dist/pokerGame.css': 'src/style/pokerGame.scss'

		browserify: 
			main:
				files:
					'dist/pokerGame.js': 'src/*.js'

		watch:
			main:
				files: [
					'./src/**/*'
					'./bower_components/*'
					'./node_modules/*'
				]
				tasks: testAndBuild
				options:
					interrupt: true
					spawn: false
			test:
				files: './test/*.coffee'
				tasks: test
				options:
					interrupt: true
					spawn: false

	grunt.registerTask 'default', build
	grunt.registerTask 'test', test
	grunt.registerTask 'run', run
	