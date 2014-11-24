#!/usr/bin/env node

var download = require('download');
var path = require('path');

download('http://kangoextensions.com/kango/kango-framework-latest.zip', path.resolve(__dirname, '..', 'kango'), { extract: true }).
on('error', function (err) {
    console.error(err);
    process.exit(0);
}).
on('close', function () {
    process.exit();
});
