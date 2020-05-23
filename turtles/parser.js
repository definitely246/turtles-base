
let fs = require('fs');
let ejs = require('ejs');
let _ = require('lodash');
let Feed = require('feed').Feed;

/**
 * Parse a file with given variables and return some content as a string
 * Using this parser here: https://github.com/blueimp/JavaScript-Templates
 */
class parser {

	constructor(rootPath = '$') {
		this.rootPath = rootPath
	}

    parse(file, variables) {
    	try {
            let context = {};

            context[this.rootPath] = variables;
            context['_'] = _;
	    context['Feed'] = Feed;
            return ejs.render(fs.readFileSync(file).toString(), context, { filename: file });
    	}
    	catch (e) {

    		// ignore empty files
    		if (typeof e.message !== 'undefined' && e.message == 'document is not defined' && typeof e.name !== 'undefined' && e.name == 'ReferenceError')
    		{
    			return '';
    		}

    		throw e;
    	}
    }
}

module.exports = parser;
