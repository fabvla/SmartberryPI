var figlet = require('figlet');

module.exports = function(module_callback) {

	figlet("SmartberryPI", function(err, data) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		module_callback(data); // then print logo on console
	});
}