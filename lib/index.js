'use strict';

module.exports = SimpleRewrite;

function SimpleRewrite (search, replace, handler) {
	return function (req, res) {
		req._originalUrl = req._originalUrl || [];
		req._originalUrl.push(req.url);

		req.url = req.url.replace(search, replace);
		handler(req, res);
	};
}
