# simple-rewrite

[![Build Status](https://travis-ci.org/omsmith/simple-rewrite.png?branch=master)](https://travis-ci.org/omsmith/simple-rewrite) [![Coverage Status](https://coveralls.io/repos/omsmith/simple-rewrite/badge.png)](https://coveralls.io/r/omsmith/simple-rewrite)

A minimal wrapper around String.prototype.replace for request path rewriting

## Example
```
'use strict';

var rewrite = require('simple-rewrite');

require('http')
	.createServer(rewrite('/', '/blog', serveBlog));

function serveBlog (req, res) {
	res.statusCode = 200;
	res.end();
	console.log(req.url);
}
```
