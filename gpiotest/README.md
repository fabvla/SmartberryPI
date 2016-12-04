GPIO Test via Node.js
========

This utility is an helper to test your wire connection easily.
After the remote is connected to GPIO, use this utility for simulate button ON / OFF pressed.
The program emulate Button "ON" pressed for 1 sec, than wait (with outlet active) for 10 seconds, than emulate Button "OFF" pressed for 1 sec.
The result is that the device attached to the outlet will run for 10 seconds.


Installation
----

Make sure you have at least Node.js 6.00+.
If no, please follow this steps:

```

sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
sudo apt-get remove npm -y

sudo curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
sudo apt-get install -y nodejs


node -v
npm -v
```

Than, install dependencies:

```
npm install
```

Than, connect the remote to the appropriate GPIO pin, by default we use:

* Button ON: GPIO 17, Physical pin 11, http://pinout.xyz/pinout/pin11_gpio17#
* Button OFF: GPIO 27, Physical pin 13, http://pinout.xyz/pinout/pin13_gpio27#


And run the program:

```
node index.js
```

