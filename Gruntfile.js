/*
 * boobel
 * http://boobeljs.io/
 *
 * Copyright (c) 2015 Noah Rodenbeek, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');

    // Project configuration.
    grunt.initConfig({

        boobel: {
            options: {
                html: true,
                transformFrom: 'Bootstrap',
                transformTo: 'Foundation'
            },
            files: {
                dest: 'test/output',
                src: ['test/html/file1.html']
            }
        },

        clean: ["test/output"]

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['boobel']);
    grunt.registerTask('clean', ['clean']);
};