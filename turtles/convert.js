
const _ = require('lodash');
const fs = require('fs-extra');
const yamlFront = require('yaml-front-matter');
const path = require('path');
const md = require('markdown-it')({ html: true, linkify: true, typographer: true });
const ig = require('ignore')();
const config = require('./../config.js');
var database = {};

ig.add(config.static.map((path) => {
    return `${config.dir}/${path}`;
}));


function convert_data(basedir, file)
{
    var source = `${basedir}/${file}`;
    const str = fs.readFileSync(source, 'utf8');
    var obj = yamlFront.loadFront(str);

    if (!obj.type) {
        obj.type = path.basename(basedir);
    }

    obj.filepath = source;
    obj.body = md.render(obj.__content);

    if (config.schemas[obj.type]) {
        obj = config.schemas[obj.type].map(obj, config);
    }

    delete obj.__content;
    return obj;
}


function handle_file(basedir, file)
{
    var source = `${basedir}/${file}`;
    var target = `${basedir}/${file}`.replace(config.dir, config.target);

    // just copy over as static file
    if (ig.ignores(source) || path.extname(source) != config.extension) {
        fs.copySync(source, target);
    }
    else {
        var obj = convert_data(basedir, file);
        var type = obj.type || 'uncategorized';

        if (!database[type]) {
            database[type] = [];
        }

        database[type].push(obj);
    }
}


function handle_dir(basedir)
{
    fs.readdirSync(basedir).forEach(file => {
        const stats = fs.lstatSync(`${basedir}/${file}`);

        if (stats.isDirectory()) {
            handle_dir(`${basedir}/${file}`);
        } else if (stats.isFile()) {
            handle_file(basedir, file)
        }
    });
}


handle_dir(config.dir);


_(database).each(function(objs, type) {
    if (config.schemas[type]) {
        config.schemas[type].updated(objs);
    }
});

config.updated(database);

// write the file out
fs.writeFileSync(config.database, "module.exports=" + JSON.stringify(database, null, 2));
