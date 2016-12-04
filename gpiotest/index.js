var Gpio = require('onoff').Gpio;
var sleep = require('sleep');

outlet_btn_on = new Gpio(17, 'out');	// Physical pin 11, http://pinout.xyz/pinout/pin11_gpio17#
outlet_btn_off = new Gpio(27, 'out');	// Physical pin 13, http://pinout.xyz/pinout/pin13_gpio27#

//Switch ON outlet
console.log("Button ON Pressed");
outlet_btn_on.writeSync(1);
sleep.sleep(1);
outlet_btn_on.writeSync(0);
console.log("Button ON Released");


//take the outlets "ON" for 10 seconds
sleep.sleep(10);

//Switch OFF outlet
console.log("Button OFF Pressed");
outlet_btn_off.writeSync(1);
sleep.sleep(1);
outlet_btn_off.writeSync(0);
console.log("Button OFF Released");
