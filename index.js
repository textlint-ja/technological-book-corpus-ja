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
        license: "CC BY-NC <https://github.com/asciidwango/js-primer/blob/master/LICENSE>"
    },
    "JavaScript-Plugin-Architecture": {
        name: "JavaScript-Plugin-Architecture",
        url: "https://github.com/azu/JavaScript-Plugin-Architecture",
        license: "CC BY-NC <https://github.com/azu/JavaScript-Plugin-Architecture#license>"
    },
    "Introduction-to-Addon-Development-in-Blender-Web": {
        name: "Introduction-to-Addon-Development-in-Blender-Web",
        url: "https://github.com/nutti/Introduction-to-Addon-Development-in-Blender-Web",
        license: "CC BY <https://github.com/nutti/Introduction-to-Addon-Development-in-Blender-Web/blob/master/LICENSE>"
    },
    "The-Little-Book-on-CoffeeScript": {
        name: "The-Little-Book-on-CoffeeScript",
        url: "https://github.com/minghai/library/tree/gh-pages",
        license: "MIT <https://github.com/minghai/library/blob/gh-pages/coffeescript/LICENSE>"
    },
    "progit": {
        name: "progit",
        url: "https://github.com/progit/progit",
        license: "CC BY-NC-SA 3.0 <https://git-scm.com/book/en/v2>"
    },
    "what-is-maven": {
        name: "what-is-maven",
        url: "https://github.com/KengoTODA/what-is-maven",
        license: "CC BY-NC 4.0 <https://github.com/KengoTODA/what-is-maven/blob/main/preface/README.md>"
    },
    "Hatena-Textbook": {
        name: "Hatena-Textbook",
        url: "https://github.com/hatena/Hatena-Textbook",
        license: "CC BY-NC-SA 2.0 <https://github.com/hatena/Hatena-Textbook#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9>"
    },
    "build-web-application-with-golang": {
        name: "build-web-application-with-golang",
        url: "https://github.com/astaxie/build-web-application-with-golang",
        license: "BSD 3-Clause <https://github.com/astaxie/build-web-application-with-golang/blob/master/LICENSE.md>"
    },
    "Go-SCP-jaJP": {
        name: "Go-SCP-jaJP",
        url: "https://github.com/techtouch-inc/Go-SCP-jaJP",
        license: "CC BY-SA 4.0 <https://github.com/techtouch-inc/Go-SCP-jaJP#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9>"
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
