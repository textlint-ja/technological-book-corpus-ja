// MIT © 2017 azu
"use strict";
const globby = require('globby');
const path = require("path");
const References = {
    "js-primer": {
        name: "js-primer",
        url: "https://github.com/asciidwango/js-primer",
        license: "https://github.com/asciidwango/js-primer/blob/master/LICENSE"
    },
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
    },
    "progit": {
        name: "progit",
        url: "https://github.com/progit/progit",
        license: "https://git-scm.com/book/en/v2"
    },
    "what-is-maven": {
        name: "what-is-maven",
        url: "https://github.com/KengoTODA/what-is-maven",
        license: "https://github.com/KengoTODA/what-is-maven/blob/master/preface.md#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9"
    },
    "Hatena-Textbook": {
        name: "Hatena-Textbook",
        url: "https://github.com/hatena/Hatena-Textbook",
        license: "https://github.com/hatena/Hatena-Textbook#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9"
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
