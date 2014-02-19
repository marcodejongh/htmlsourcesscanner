/*
 * htmlSourcesScanner
 * https://github.com/marcodejongh/htmlSourcesScanner
 *
 * Copyright (c) 2014 Marco de Jongh
 * Licensed under the MIT license.
 */

'use strict';

/***
 * Scans a html file for it's included sources synchronously
 *
 * @param {string} file		the html file to scan
 * @returns {object}	The results object
 */
exports.scanSync = function (file) {
	if(!file) {
		return 'Please specify a file';
	} else {
		var fs = require('fs'),
				jsFiles = [],
				jsHintFiles = [],
				cssFiles = [],
				data = fs.readFileSync(file, 'utf8'),
				regex = /<script.*src="(.+)"/gm,
				match = regex.exec(data),
				path;

		while (match) {
			path = match[1];
			if (!(path.substring(0, 'http://'.length) === 'http://' || path.substring(0, 'https://'.length) === 'https://')) {
				if (path.substring(0, 'lib/'.length) !== 'lib/') {
					jsHintFiles.push(path);
				}

				jsFiles.push(path);
			}

			match = regex.exec(data);
		}

		regex = /@import url\('(.*)'\);/gm;
		match = regex.exec(data);

		while (match) {
			path = match[1];
			cssFiles.push(path);

			match = regex.exec(data);
		}

		regex = /<link .* href="(.*)".*\/>/gm;
		match = regex.exec(data);

		while (match) {
			path = match[1];
			cssFiles.push(path);

			match = regex.exec(data);
		}

		return {
			js: jsFiles,
			css: cssFiles
		};
	}
};

