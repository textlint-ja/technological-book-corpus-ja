// MIT © 2017 azu
"use strict";
import { globbySync} from "globby";
import url from "node:url";
import path from "node:path";
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

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
    "Introduction-to-Addon-Development-in-Blender-Web": {
        name: "Introduction-to-Addon-Development-in-Blender-Web",
        url: "https://github.com/nutti/Introduction-to-Addon-Development-in-Blender-Web",
        license: "https://github.com/nutti/Introduction-to-Addon-Development-in-Blender-Web/blob/master/LICENSE"
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
    },
    "build-web-application-with-golang": {
        name: "build-web-application-with-golang",
        url: "https://github.com/astaxie/build-web-application-with-golang",
        license: "https://github.com/astaxie/build-web-application-with-golang/blob/master/LICENSE.md"
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
    return globbySync(path.join(sourceDir, patterns), {
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

export {
    References,
    findByPattern,
    get
};
