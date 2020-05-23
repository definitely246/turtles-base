
const gatt = require('gatt');
const parser = require('./parser.js');
const variables = require('./../database.js');

gatt({
    "variables": variables,
    "reader_directory": 'template',
    "writer_directory": 'site',
    "parser": new parser,
});
