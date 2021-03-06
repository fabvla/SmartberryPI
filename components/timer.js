var cron = require('cron');

module.exports = function(config, devices, programs, _cb) {
	// Starting Timer
	console.info('Timer Starts at:', new Date());
	
	//initialize components
	programs.init(config, devices);
	devices.init(config, programs.active());

	//reset all devices
	devices.reset();
	
	//ticker run every minute
	var tickerJob = cron.job("0 * * * * *", function(){
		if( config.debug == true){
			console.info('Run Ticker Job at:', new Date());
		}
		
	    var date = new Date();
	    var currentMinute = date.getHours() * 60 + date.getMinutes();
		if( config.debug == true){
			console.info("Current Minute: ", currentMinute);
		}
		
	    if( config.enabled == true ){
			Object.keys(devices.list()).forEach(function(key) {
				var device = devices.list()[key];
				
				//switch on / off / toggle based on timeline status and auto status
				if( device.auto() == true && device.enabled() ){
					if( device.timeline()[currentMinute] == "on" ){
						device.on();
					}
					else if( device.timeline()[currentMinute] == "off" ){
						device.off();
					}
					else if( device.timeline()[currentMinute] == "toggle" ){
						device.toggle();
					}
				}
			});
	    }
	    else{
			if( config.debug == true){
				console.info("RaspberryPI is not enable, skip.");
			}
	    }
	}); 
	tickerJob.start();
	
	//reset programs every 00:00
	var resetJob = cron.job("0 0 0 * * *", function(){
		if( config.debug == true){
			console.info('Run Reset Job at:', new Date());
			console.info('Pausing ticker Job.');
		}

		tickerJob.stop();
		
		//re-initialize components
		if( config.debug == true){
			console.info('Reinitializing programs and devices.');
		}
		programs.init(config, devices);
		devices.init(config, programs.active());
		
		//reset all devices
		devices.reset();

		if( config.debug == true){
			console.info('Restart ticker Job.');
		}
		tickerJob.start();
	}); 
	resetJob.start();
	
	//re-enable SmartberryPI at 8:00 AM
	var enableJob = cron.job("0 0 8 * * *", function(){
		if( config.debug == true){
			console.info('Run Enable Job at:', new Date());
		}
		
		//switch server to on
		if( config.enabled == false ){
			config.enabled = true;
			
			//reset all devices
			devices.reset();
			
			if( config.debug == true){
				console.info('RaspberryPI re-enabled.');
			}
		}
	}); 
	enableJob.start();
}