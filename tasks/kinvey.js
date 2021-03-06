/*
 * grunt-kinvey
 * https://github.com/Cutehacks/grunt-kinvey
 *
 * Copyright (c) 2014 Cutehacks AS
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('kinvey', 'A Grunt plugin that wraps the kinvey command line tool for managing business logic.', function() {
        var done = this.async();

        if (!grunt.file.exists('.kinvey')) {
            grunt.log.error("Grunt file does not exist. Please run 'kinvey init' manually.");
        }

        // Instead of silently ignoring 'files', throw an error so the user does not have false expectations.
        if (this.files.length > 0) {
            grunt.log.error('The "kinvey" command does not support the files attribute.');
        }

        var options = this.options({
            email: process.env["KINVEY_EMAIL"],
            password: process.env["KINVEY_PASSWORD"]
        });

        var data = this.data;
        var args = [];

        var supportedCommands = ['deploy', 'refresh'];
        if (!data.command) {
            grunt.log.error('kinvey tasks require that you specify a "command"');
        } else if (supportedCommands.indexOf(data.command) >= 0) {
            args.push(data.command);
        } else {
            grunt.log.error('Unsupported command: ' + data.command);
        }

        if (!data.environment) {
            grunt.log.error('kinvey tasks require that you specify an "environment"');
        } else {
            args.push('--environment', data.environment);
        }

        if (!options.email && !options.password) {
            grunt.log.writeln('No email/password specified. Will attempt to use .kinvey credentials.');
        }

        if (options.email) {
            args.push('--email', options.email);
        }

        if (options.password) {
            args.push('--password', options.password);
        }

        if (options.app) {
            args.push('--app', options.app);
        }

        // Options no longer supported from v0.2.0
        if (options.debug) {
            grunt.log.warning('The "debug" option is no longer supported');
        }
        if (options.quiet) {
            grunt.log.warn('The "quiet" option is no longer supported');
        }

        if (this.args.length === 1 && data.command === 'deploy') {
            args.push('--message', this.args.shift());
        }

        if (this.errorCount > 0) {
            done(new Error('An error has occured.'));
            return;
        }

        var child = {
            cmd: 'kinvey',
            args: args,
            opts: {
                stdio: 'inherit'
            }
        };


        var kinvey = grunt.util.spawn(child, function (error, result, code) {
            done(error);
        });
    });
};
