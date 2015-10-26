/*
 * boobel
 * http://boobeljs.io/
 *
 * Copyright (c) 2015 Noah Rodenbeek, contributors
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function ( /*grunt*/ ) {
    var exports = {
        transformHTML: transformHTML
    };

    function transformHTML(content) {
        content = content.replace(/small-([1]?[0-9])/g, "col-xs-$1");
        return content;
    }

    return exports;
};