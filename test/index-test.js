// MIT © 2017 azu
"use strict";
const assert = require("assert");
const path = require("path");
const corpus = require("../index");
describe("technological-book-corpus-ja", () => {
    describe("#get", () => {
        it("should get all files", () => {
            const files = corpus.get();
            assert(Array.isArray(files));
            assert(files.length > 0);
        });
    });
    describe("#get(ext)", () => {
        it("should get all ext files", () => {
            const files = corpus.get(".md");
            files.every(filePath => {
                assert(path.extname(filePath), ".md");
            });
        });
    });
    describe("#findByPattern(ext)", () => {
        it("should get all files that match pattern", () => {
            const files = corpus.findByPattern("/JavaScript-Plugin-Architecture/**/*.md");
            files.every(filePath => {
                assert(filePath.includes("JavaScript-Plugin-Architecture/"));
            });
        });
    });
});