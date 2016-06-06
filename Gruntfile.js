'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Our parameters, which are set when grunt command is ran
    // Timeline, etc.
    var template = grunt.option('template');
    // Name of project folder
    var folder = grunt.option('folder');

    // Output final URL on command line
    grunt.log.write('URL: http://files.gazlab.com/content-host/static-content/projects/' + folder + '/index.html' );

    // Initialize grunt
    grunt.initConfig({
    	// Copy files
        copy: {
            // Copy our base files
            base: {
                files: [
                    // Copy base directory
                    {
                        expand: true,
                        cwd: 'templates/_base',
                        src: '**',
                        dest: 'projects/' + folder
                    },
                    // Copy template specific directory
                    {
                        expand: true,
                        cwd: 'templates/' + template,
                        src: '**',
                        dest: 'projects/' + folder
                    }
                ]
            }
		},
		// Delete files
		clean: {
            project: {
                src: ['projects/' + folder + '/**']
            }
        },
        // Deploy to FTP server
        'sftp-deploy': {
            build: {
                auth: {
                    host: 'ftp2.ftptoyoursite.com',
                    authKey: 'smgKey'
                },
                src: 'projects/' + folder,
                dest: '/static-content/projects/' + folder,
                serverSep: '/'
            }
        }
	});

	// Create empty files
    grunt.registerTask('emptyFiles', 'Creates empty files', function() {
    	grunt.file.write('projects/' + folder + '/js/script.js', '');
    });
	
	// Create new project
    grunt.registerTask('new', [
        'emptyFiles',
        'copy:base'
    ]);

    // Delete a project
    grunt.registerTask('delete', [
        'clean:project'
    ]);

    // Deploy a project to FTP server
    grunt.registerTask('deploy', [
        'sftp-deploy'
    ]);
};