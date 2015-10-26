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
        content = content.replace(/col-(xs|sm)-([1]?[0-9])/g, "small-$1");
        return content;
    }

    return exports;
};