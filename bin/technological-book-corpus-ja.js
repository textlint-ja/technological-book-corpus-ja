#!/usr/bin/env node
const get = require('../').get;
const findByPattern = require('../').findByPattern;
if (process.argv[2]) {
    console.log(findByPattern(process.argv[2]).join("\n"));
} else {
    console.log(get().join("\n"));
}