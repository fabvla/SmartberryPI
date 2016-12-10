//#!/usr/bin/env node

/*
 * On Raspberry Pi make sure to execute with SUDO.
 * On Windows platform make sure to have Visual Studio Express 2013 installed (https://github.com/voodootikigod/node-serialport)
 */

//requires
var async = require('async');
var chalk = require('chalk');
var devices = require('./components/devices.js');
var programs = require('./components/programs.js');

//load configuration file
var config = require('./config.json');

//Starting Flow
async.series({

		ascii_logo: function(callback) {
            require('./components/ascii_logo.js')(function(logo) {
                console.log(chalk.magenta(logo)); // print blue ascii logo
                callback(null, 1);
            });
        },
        
        server: function(callback) {
            // Starting HTTP Server, API, and Web Socket
            require('./components/server.js')(config, function(server) {
                // Handling routes and Web Socket Handler.
                var http = server.http;
                var io = server.io;

                require('./components/api.js')(http, io, config, devices, programs);

                // Web Socket handler
                require('console-mirroring')(io); // Console mirroring

            });

            callback(null, 1);
        },
        
        timer: function(callback) {
            // Starting HTTP Server, API, and Web Socket
            require('./components/timer.js')(config, devices, programs, function(timer) {
            	
            	if( config.debug == true){
            		console.log("Timer start:", timer);
            	}
            });

            callback(null, 1);
        }

    },
    function(err, results) {
        // debug('Results: ', results);
    }
);



/*
 * Shutdown procedure
 */

//(Ctrl + C) - Handler
if (process.platform === 'win32') {
    var rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', function() {
        process.emit('SIGINT');
    });

    rl.close(); // without it we have conflict with the Prompt Module.
}

process.on('SIGINT', function() {
    console.log('Closing...');
    
    //devices.reset();
    
    console.log('Server halted.');
    
    process.exit();
});