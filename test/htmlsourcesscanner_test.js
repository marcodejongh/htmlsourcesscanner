'use strict';

var htmlsourcesscanner = require('../lib/htmlsourcesscanner.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['scanSync'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(htmlsourcesscanner.scanSync(), 'Please specify a file', 'should return an error.');
    test.done();
  },
	'testFile1.html': function(test) {
		test.expect(2);
		var result = htmlsourcesscanner.scanSync('./test/testFile1.html');
		test.deepEqual(result.js, ['file1.js', 'file2.js', 'file3.js'], 'Should return an array with the included js files');
		test.deepEqual(result.css, ['lib/CodeMirror/codemirror.css', 'css/ie7.css'], 'Should return an array with the included css files');
		test.done();
	}
};
