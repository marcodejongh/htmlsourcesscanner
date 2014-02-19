/*
 * htmlSourcesScanner
 * https://github.com/marcodejongh/htmlSourcesScanner
 *
 * Copyright (c) 2014 Marco de Jongh
 * Licensed under the MIT license.
 */

'use strict';
var defaultOptions = {
	excludeExternal: false
};

/***
 * Scans a html file for it's included sources synchronously
 *
 * @param {string} file		the html file to scan
 * @returns {object}	The results object
 */
exports.scanSync = function (file, options) {
	if(!file) {
		return 'Please specify a file';
	} else {
		var fs = require('fs'),
				jsFiles = [],
				cssFiles = [],
				_ = require('lodash-node'),
				data = fs.readFileSync(file, 'utf8'),
				path, isExternal, match, regex;

		options = _.merge({}, defaultOptions, options);

		regex = /<script.*src="(.+)"/gm;
		match = regex.exec(data);

		while (match) {
			path = match[1];
			isExternal = (path.substring(0, 'http://'.length) === 'http://' || path.substring(0, 'https://'.length) === 'https://');

			if(!(options.excludeExternal && isExternal)) {
				jsFiles.push(path);
			}

			match = regex.exec(data);
		}

		regex = /@import url\('(.*)'\);/gm;
		match = regex.exec(data);

		while (match) {
			path = match[1];
			isExternal = (path.substring(0, 'http://'.length) === 'http://' || path.substring(0, 'https://'.length) === 'https://');

			if(!(options.excludeExternal && isExternal)) {
				cssFiles.push(path);
			}

			match = regex.exec(data);
		}

		regex = /<link .* href="(.*)".*\/>/gm;
		match = regex.exec(data);

		while (match) {
			path = match[1];
			isExternal = (path.substring(0, 'http://'.length) === 'http://' || path.substring(0, 'https://'.length) === 'https://');

			if(!(options.excludeExternal && isExternal)) {
				cssFiles.push(path);
			}

			match = regex.exec(data);
		}

		return {
			js: jsFiles,
			css: cssFiles
		};
	}
};

