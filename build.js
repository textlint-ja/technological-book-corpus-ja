// MIT © 2017 azu
"use strict";
const cpx = require("cpx");
const path = require("path");
const repoDir = path.join(__dirname, "repo");
const sourceDir = path.join(__dirname, "source");
const fs = require("fs");
const addTextToMarkdown = require("add-text-to-markdown");
const Refs = require("./index").References;

/**
 *
 * @param {Object} repoObject リポジトリ情報
 * @param {string} pattern glob pattern
 */
function copy(repoObject, pattern) {
    const repo = repoObject.name;
    const baseDir = path.join(repoDir, repo);
    return new Promise((resolve, reject) => {
        cpx.copy(`${baseDir}/${pattern}`, `${sourceDir}/${repo}`, {
            clean: true,
            preserve: true
        }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


function copyTask() {
    return Promise.all([
        copy(Refs["js-primer"], "source/basic/**/*.md"),
        copy(Refs["JavaScript-Plugin-Architecture"], "ja/**/*.md"),
        copy(Refs["Introduction-to-Addon-Development-in-Blender-Web"], "src/2.7/markdown/**/*.md"),
        copy(Refs["The-Little-Book-on-CoffeeScript"], "coffeescript/chapters/ja_JP/**/*.md"),
        copy(Refs["progit"], "ja/**/*.{md,markdown}"),
        copy(Refs["what-is-maven"], "{deploy,implement-plugin,module,primer}/**/*.md"),
        copy(Refs["Hatena-Textbook"], "/**/*.md"),
        copy(Refs["build-web-application-with-golang"], "ja/**/{0,1}*.md"),
    ]);
}

function updateReference() {
    const README = fs.readFileSync(path.join(__dirname, "README.md"), "utf-8");
    const refs = Object.keys(Refs).map(key => {
        const repoInfo = Refs[key];
        return `- [${repoInfo.name}](${repoInfo.url})
  - License: ${repoInfo.license}`
    }).join("\n");
    const addContent = `このコーパスは次の文書を含んでいます。
それぞれの文書のライセンスに基づき再配布されています。

${refs}`;
    const newContent = addTextToMarkdown(README, addContent, "References");
    fs.writeFileSync(path.join(__dirname, "README.md"), newContent, "utf-8");
}

// main
(async function () {
    await copyTask();
    updateReference();
})();
