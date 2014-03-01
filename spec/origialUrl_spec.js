/* global describe, it, before */

'use strict';

var rewrite = require('../'),
	request = require('supertest'),
	http = require('http');

describe('rewrite', function () {
	var handler;
	before(function (done) {
		handler = rewrite('url', 'lru', function (req, res) {
			res.statusCode = 200;
			res.end(req.url + req._originalUrl[0]);
		});

		done();
	});

	it('should place original url in an array _originalUrl', function (done) {
		request(http.createServer(handler))
			.get('/my/url/is/cool')
			.expect(200)
			.expect('/my/lru/is/cool/my/url/is/cool')
			.end(done);
	});
});
