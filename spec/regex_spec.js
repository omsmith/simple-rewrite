/* global describe, it, before */

'use strict';

var rewrite = require('../'),
	request = require('supertest'),
	http = require('http');

describe('rewrite', function () {
	var handler;
	before(function (done) {
		handler = rewrite(/^\/max\/(.+)/, '/min/$1', function (req, res) {
			res.statusCode = 200;
			res.end(req.url);
		});

		done();
	});

	it('should accept a regex replacement', function (done) {
		request(http.createServer(handler))
			.get('/max/power/is/great')
			.expect(200)
			.expect('/min/power/is/great')
			.end(done);
	});
});
