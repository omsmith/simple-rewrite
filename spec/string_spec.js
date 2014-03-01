/* global describe, it, before */

'use strict';

var rewrite = require('../'),
	request = require('supertest'),
	http = require('http');

describe('rewrite', function () {
	var handler;
	before(function (done) {
		handler = rewrite('dingleberries', 'peaches', function (req, res) {
			res.statusCode = 200;
			res.end(req.url);
		});

		done();
	});

	it('should replace a string', function (done) {
		request(http.createServer(handler))
			.get('/i/enjoy/dinglberries/in/stew/but/i/dont/like/dingleberries/in/soup')
			.expect(200)
			.expect('/i/enjoy/dinglberries/in/stew/but/i/dont/like/peaches/in/soup')
			.end(done);
	});
});
