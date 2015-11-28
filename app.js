// packages
var express = require('express');
var expressValidator = require('express-validator');
var http = require('http');
var path = require('path');
var swig = require('swig');

// controllers
var home = require('./app/controllers/home');

var app = express();

// settings
app.set('port', process.env.PORT || 3000);

// views
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// global middleware
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());

// development middleware
if (app.get('env') === 'development') {
	// inject livereload script
	app.use(require('connect-livereload')());

	app.use(express.errorHandler());
}

// staging and production middleware
/*if (app.get('env') === 'staging' || app.get('env') === 'production') {

	// force https and no www
	app.use(function(req,res,next) {
		if (req.headers['x-forwarded-proto'] !== 'https' || req.get('host').match(/^www/) !== null) {
			res.redirect(['https://', req.get('host').replace(/^www\./, ''), req.url].join(''));
		}
		else {
			next();
		}
	});
}*/

// start router
app.use(app.router);

// set expires headers on static assets
app.use(function(req, res, next) {
    if(req.url.indexOf("/images/") === 0 || req.url.indexOf("/js/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("/fonts/") === 0) {
        res.setHeader("Cache-Control", "public, max-age=345600"); // 4 days
        res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString());
    }
    return next();
});

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', home.index);

// catchall 404
app.use(function(req, res, next) {
	res.status(404);

	res.render('error', {
		meta: {
			title: 'Oops',
		},
	});
});

// error handler
app.use(function(err, req, res, next) {
	if (err) {
		console.log(err);

		res.status(500);
		res.render('error', {
			meta: {
				title: 'Oops',
			},
		});
	}
});

// start server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
