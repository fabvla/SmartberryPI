SmartberryPI
========

**SmartberryPI** is a simple Node.js library for building a task scheduler for Automation and IoT installations based on Raspberry PI.


Introduction
----

In a recent installation we had the need to create effects of light and switch devices randomly.
Objects in our installation had to "animate" in particular time intervals, and we planned to manage the whole effects using Raspberry PI, with some software written from scrach in Node.js that allow you to define one or more daily programs "on" and "off" with ignition scheduled.
Defining different programs, each day is selected randomly from the program actually run, so visitors could see different behaviour every day.

The status of the devices can be seen in a simple web interface that display the status of all devices (current on/off) and with a master button is it possible to switch ON / OFF the whole process.


Basic Setup
----

For this setup you need:

* A RaspberryPI (I used RaspberryPI 3 Model B)
* A set of plugs remote controlled, in my setup I used [Etekcity® Remote Control Electrical Plug & Power Outlet](http://www.etekcity.com/product/100066.html)

In my case the remote has one button for power ON and another button for power OFF for each plugs. This means that we need a couple of GPIO pins for each plugs, in order to simulate the button pressed for ON / OFF operation.


Installation
----

Clone the git repo in your RaspberryPI directory, like:

```

mkdir /opt/smartberrypi
git clone https://github.com/fabvla/SmartberryPI.git .
npm install

```

**NOTE:** If you're trying SmartberryPI on Windows, please read carefully the node-gyp installation prerequisites:

`https://github.com/nodejs/node-gyp`

I suggest to use "Windows -> Option 1":

`npm install --global --production windows-build-tools` 

that works perfectly for me.


Configuring Devices
----

First of all, configures your devices (each device corresponds to one or two GPIO Pins, depends on how your remote works):

1. Copy `config.json.sample` to `config.json`
2. Edit `config.json.sample` and map every device with a Name and GPIO PIN:


```
{
    "port": 5000,
    "devices": {
        "device_1": {
            "name": "Lamp 1",
            "driver": "remote_onoff_mock",
            "pin_on": 21,
            "pin_off": 22
        },
        "device_2": {
            "driver": "remote_onoff_mock",
            "name": "Lamp 2",
            "pin_on": 23,
            "pin_off": 24
        },
        "device_3": {
            "name": "Lamp 3",
            "driver": "remote_onoff_mock",
            "pin_on": 25,
            "pin_off": 26
        },
        "device_4": {
            "name": "Table",
            "driver": "remote_onoff_mock",
            "pin_on": 27,
            "pin_off": 28
        },
        "device_5": {
            "name": "Floor",
            "driver": "remote_onoff_mock",
            "pin_on": 29,
            "pin_off": 30
        }
    }
}
```

**Note:** I made a driver for my specific remote controller, and is it possible to specify a different driver for each device. This means that you can control different type of device (ie: a smart plug, an RF433MHz device etc...).


Configuring Programs
----

You can configure one or more programs, you can see an example on `programs/program.json.sample`.

1. Copy `programs/program.json.sample` to `programs/program_1.json`
2. Edit `programs/program_1.json` and define for each device one or more timer status.

You can define one or more programs, if there are many programs, every day one will be choosed randomly.
For each device you can define multiple time and status in this way `{"at": "9:50", "status": true}`.
For example, you can define that device_1 is switched "on" at 9:50, switched off at 11:12 and so on.

If you want to switch on for all the day one device, you can simply add only one row like: `{"at": "00:00", "status": true},`.

Here an example:

```
{
    "device_1": [
        {"at": "9:10", "status": "on"},
        {"at": "11:12", "status": "off"},
        {"at": "12:50", "status": "on"},
        {"at": "13:20", "status": "off"},
        {"at": "17:30", "status": "on"},
        {"at": "23:59", "status": "off"}
    ],
    "device_2": [
        {"at": "9:00", "status": "on"},
        {"at": "10:05", "status": "off"},
        {"at": "12:10", "status": "on"},
        {"at": "13:36", "status": "off"},
        {"at": "17:35", "status": "on"},
        {"at": "21:00", "status": "off"},
        {"at": "21:10", "status": "on"}
    ],
    "device_3": [
        {"at": "9:40", "status": "on"},
        {"at": "11:20", "status": "off"},
        {"at": "13:05", "status": "on"},
        {"at": "16:21", "status": "off"},
        {"at": "18:00", "status": "on"},
        {"at": "18:10", "status": "off"},
        {"at": "19:05", "status": "on"},
        {"at": "20:30", "status": "off"},
        {"at": "21:10", "status": "on"}
    ],
    "device_4": [
        {"at": "19:30", "status": "on"},
        {"at": "20:55", "status": "off"},
        {"at": "21:30", "status": "on"}
    ],
    "device_5": [
    ]
}
```

Actually status value can be set to:

* `on`: Power On the device
* `off`: Power Off the device
* `toggle`: Switch status of the device


Web Interface
----

Connect to your Raspberry PI web server:

`http://raspberrypi/`

to see the schedule status.
You can also switch ON / OFF the scheduler for the current day.

Every day, at midnight when reset task runs, it reset all the switches and re-set the application to default values (active=true) and with a new daily program.


References and Acknowledgements
----

* Thanks to Rocco Musolino, we inspired our project by his [IOT-433 Project](https://github.com/roccomuso/iot-433mhz)
* [RPI-433](https://github.com/eroak/rpi-433), a Node.js library for sniffing the RF codes of our outlets and remote
