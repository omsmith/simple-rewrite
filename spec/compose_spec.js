/* global describe, it, before */

'use strict';

var rewrite = require('../'),
	request = require('supertest'),
	http = require('http');

describe('rewrite', function () {
	var handler;
	before(function (done) {
		handler = rewrite('url', 'lru', rewrite('lru', 'sheep', function (req, res) {
			res.statusCode = 200;
			res.end(req.url + req._originalUrl[0] + req._originalUrl[1]);
		}));

		done();
	});

	it('should compose rewrites', function (done) {
		request(http.createServer(handler))
			.get('/my/url/is/cool')
			.expect(200)
			.expect('/my/sheep/is/cool/my/url/is/cool/my/lru/is/cool')
			.end(done);
	});
});
