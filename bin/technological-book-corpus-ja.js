#!/usr/bin/env node
import { findByPattern, get } from "../";
if (process.argv[2]) {
    console.log(findByPattern(process.argv[2]).join("\n"));
} else {
    console.log(get().join("\n"));
}
