#!/usr/bin/env node
const argv = require("yargs").argv;
const process = require("../index");

const { nameSpace, output, url } = argv;

if (!nameSpace) {
  throw new TypeError(
    'NameSpace must be defined. Try add "--nameSpace=MyNameSpace"'
  );
}

if (!output) {
  throw new TypeError(
    'Output folder path must be defined. Try add "--output=types/generated"'
  );
}

if (!url) {
  throw new TypeError(
    'Swagger spec url must be defined. Try add "--url=http://my-swagger.spec.com"'
  );
}

process(url, nameSpace, output);
