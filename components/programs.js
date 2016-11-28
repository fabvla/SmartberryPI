/**
 * Programs
 */

var fs = require('fs');

var programsDir = './programs/';
var activeProgram = false;

var programs = [];


/**
 * Load programs from programs directory
 */
exports.init = function(config) {
	var files = fs.readdirSync(programsDir);

	// load only .json programs
	for ( var i in files) {
		if (files[i].endsWith('.json')) {
			var program = JSON.parse(fs.readFileSync(programsDir + files[i], 'utf8'));
			programs[files[i]] = program;
		}
	}

	//set active program randomly
	randomProgramId = randomInt(0, Object.keys(programs).length);	
	activeProgram = Object.keys(programs)[randomProgramId];
	
	console.log("Loading program:", activeProgram);
};


/**
 * Get programs list
 */
exports.list = function() {
	return programs;
};


/**
 * Get active program
 */
exports.active = function() {
	return programs[activeProgram];
};


/**
 * Random Int
 * 
 * @param min
 * @param max
 * @returns
 */
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
