var express = require('express'); // Get the module
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cons = require('consolidate');

module.exports = function(config, _cb) {
	// Starting Server
	server.listen(config.port);
	console.info('Server started on', getLocalIPAddress(), '- Port', config.port);

	// set middleware
	app.use(bodyParser.json());

	// assign the mustache engine to .html files
	app.engine('html', cons.mustache);

	// set .html as the default extension
	app.set('view engine', 'html');
	app.set('views', __dirname + '/../www/views');

	// API and Web Server + Socket part
	_cb({
		http : app,
		io : io
	});

};

// utility function
function getLocalIPAddress() {
	// synchronous method
	var interfaces = require('os').networkInterfaces();
	var IPs = [];
	for ( var devName in interfaces) {
		var iface = interfaces[devName];

		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
				IPs.push(alias.address);
			}
		}
	}

	if (IPs.length === 1){
		return IPs[0];
	}
	else if (IPs.length > 1){
		return IPs.toString();
	}
	else{
		return '0.0.0.0';
	}
}
