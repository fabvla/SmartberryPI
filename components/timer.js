var cron = require('cron');

module.exports = function(config, devices, programs, _cb) {
	// Starting Timer
	console.info('Timer Starts at:', new Date());
	
	//initialize components
	devices.init(config.devices);
	programs.init();
	
	//ticker run every minute
	var tickerJob = cron.job("0 * * * * *", function(){
	    console.info('Run Ticker Job at:', new Date());
	}); 
	tickerJob.start();
	
	//reset run every 00:00
	var resetJob = cron.job("0 0 0 * * *", function(){
		programs.init();
	    console.info('Run Reset Job at:', new Date());
	}); 
	resetJob.start();
}