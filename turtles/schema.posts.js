const slugify = require('slugify');
const moment = require('moment');
const pad = require('pad');
const md = require('markdown-it')({ html: true, linkify: true, typographer: true });
const path = require('path');
var striptags = require('striptags');
const config = require('../config');

module.exports = {
    fields: {
        'title':        'text',
        'date':         'date',
        'tags':         'tags',
        'body':         'html',
        'teaser_image': 'image',
    },

    /**
     * Validate the content and throw an error if something is wrong
     * Out of the box, we will leave validation off.
     */
    validate(field_name, value, obj) {
        return true;
    },

    /**
     * This is called for each post object in database
     */
    map(obj, config) {
        var date = moment(obj.date, 'YYYY-MM-DD[T]HH:mm:ss');

        var moreFound = obj.__content.indexOf('<!-- more -->');

        if (!obj.summary && moreFound > -1) {
            obj.summary = md.render(obj.__content.substring(0, moreFound));
            obj.summary_text = striptags(obj.summary);
            obj.without_summary = md.render(obj.__content.substring(moreFound));
            obj.without_summary_text = striptags(obj.without_summary);
        } else {
            obj.summary = striptags(obj.body);
            obj.summary_text = striptags(obj.body);
            obj.without_summary = obj.body;
            obj.without_summary_text = striptags(obj.without_summary);
        }

        obj.year = date.year().toString();
        obj.month = pad(2, (date.month() + 1).toString(), '0');
        obj.day = pad(2, date.date().toString(), '0');
        obj.dow = pad(2, date.day().toString(), '0');
        obj.doy = pad(2, date.dayOfYear().toString(), '0');
        obj.week = pad(2, date.week().toString(), '0');
        obj.hour = pad(2, date.hours().toString(), '0');
        obj.minute = pad(2, date.minute().toString(), '0');
        obj.second = pad(2, date.second().toString(), '0');
        obj.pretty_date = obj.month + '/' + obj.day + '/' + obj.year;
        obj.author = obj.author ? obj.author : config.site.author;
        obj.author_email = obj.author_email ? obj.author_email : config.site.author_email;
        obj.slug = path.parse(obj.filepath).name;
        obj.url = `/${obj.year}/${obj.month}/${obj.slug}/`;

        return obj;
    },

    /**
     * This is called after all the objects have been mapped
     */
    updated(objs, config) {
        return objs.map(function(obj, index) {
            obj.prev_url = (index == 0) ? '/' : objs[index-1].url;
            obj.next_url = (index == objs.length - 1) ? '/' : objs[index+1].url;
            return obj;
        });
    }
}