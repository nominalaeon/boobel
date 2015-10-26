/*
 * boobel
 * http://boobeljs.io/
 *
 * Copyright (c) 2015 Noah Rodenbeek, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var fs = require('fs-sync');
    var parsePath = require('parse-filepath');
    var path = require('path');

    // Internal lib.
    var frameworkConfig = {
        Bootstrap: require('./lib/boobel.bootstrap.js').init(grunt),
        Foundation: require('./lib/boobel.foundation.js').init(grunt)
    };

    grunt.registerMultiTask('boobel', 'Transform front-end frameworks.', function () {

        var fileCount = 0;

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            html: false,
            transformFrom: 'Bootstrap', // may not be needed
            transformTo: 'Foundation'
        });
        var framework = frameworkConfig[options.transformTo];

        grunt.log.writeln('/* * *\n * BoobelJS\n * * */\n', options.transformFrom, ' -> ', options.transformTo);

        // Iterate over all src-dest file pairs.
        this.files.forEach(init);
        grunt.verbose.writeln('Processed ' + fileCount + ' files.');

        function init(file) {
            fileCount++;

            var filepath = parsePath(file.src.toString());
            var fileSrc = filepath.absolute;
            var fileDest = path.join(process.cwd(), file.dest, filepath.basename);

            grunt.verbose.writeln('File\'s tart:', fileSrc + ' -> ' + fileDest);

            var content = '';
            if (checkFile(fileSrc)) {
                content = transform(fileSrc) + fileCount;
            }

            // // Write the destination file.
            var status = fs.write(fileDest, content);
            grunt.verbose.writeln('File stun:', fileDest, status);
        }

        /*
         * Transforms
         */

        function transform(filepath) {
            if (options.html) {
                grunt.verbose.writeln('Transfor [HTML]', options.transformTo);
                var content = fs.read(filepath, {encoding: 'utf-8'});
                return framework.transformHTML(content);
            }
        }

        /*
         * Utils
         */

        function checkFile(filepath) {
            if (fs.isFile(filepath)) {
                grunt.verbose.writeln('Source file "' + filepath + '" found.');
                return true;
            } else {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            }
        }

    });
};