// MIT © 2017 azu
"use strict";
const globby = require('globby');
const path = require("path");
const References = {
    "JavaScript-Plugin-Architecture": {
        name: "JavaScript-Plugin-Architecture",
        url: "https://github.com/azu/JavaScript-Plugin-Architecture",
        license: "https://github.com/azu/JavaScript-Plugin-Architecture#license"
    },
    "Introduction-to-Add-on-Development-in-Blender": {
        name: "Introduction-to-Add-on-Development-in-Blender",
        url: "https://github.com/nutti/Introduction-to-Add-on-Development-in-Blender",
        license: "https://github.com/nutti/Introduction-to-Add-on-Development-in-Blender/blob/draft/LICENSE"
    },
    "The-Little-Book-on-CoffeeScript": {
        name: "The-Little-Book-on-CoffeeScript",
        url: "https://github.com/minghai/library/tree/gh-pages",
        license: "https://github.com/minghai/library/tree/gh-pages"
    }
};

const sourceDir = path.join(__dirname, "source");
/**
 * get files by glob pattern
 * @param {string} patterns glob pattern
 * "/" root is source directory
 * @see https://github.com/isaacs/node-glob
 */
function findByPattern(patterns) {
    return globby.sync(patterns, {
        root: sourceDir,
        nodir: true
    });
}
/**
 * get files by type
 * default all files
 * @param {string} ext
 * e.g) ".md"
 */
function get(ext = ".*") {
    return findByPattern(`/**/*${ext}`);
}
module.exports.References = References;
module.exports.findByPattern = findByPattern;
module.exports.get = get;
