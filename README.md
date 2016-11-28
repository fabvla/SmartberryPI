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

`mkdir /opt/smartberrypi`
`git clone https://github.com/fabvla/SmartberryPI.git .`

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
<?php return [
        'device_1' => [
                'name' => 'Lamp 1',
                'pin' => 21,
        ],
        'device_2' => [
                'name' => 'Lamp 2',
                'pin' => 22,
        ],
        'device_3' => [
                'name' => 'Table 1',
                'pin' => 23,
        ],
        'device_4' => [
                'name' => 'Table 2',
                'pin' => 24,
        ],
        'device_5' => [
                'name' => 'Floor 1',
                'pin' => 25,
        ]
];
```

**Note:** I made a driver for my specific remote controller, and is it possible to specify a different driver for each device. This means that you can control different type of device.

Configuring Programs
----

You can configure one or more programs, you can see an example on `programs/program.php.sample`.

1. Copy `programs/program.php.sample` to `programs/program_1.php`
2. Edit `programs/program_1.php` and define for each device one or more timer status.

You can define one or more programs, if there are many programs, every day one will be choosed randomly.
For each device you can define via `timelet(time, status)` function, multiple time and pin status.
For example, you can define that device_1 is switched "on" at 9:50, switched off at 11:12 and so on.
Timelets are executed sequentially.

If you want to switch on for all the day one device, you can simply add only one timelet like: `timelet("00:00", "on")`.

Here an example:

```
<?php return [
        'device_1' => [
                timelet("9:50", "on"),
                timelet("11:12", "off"),
                timelet("12:50", "on"),
                timelet("13:20", "off"),
                timelet("17:30", "on"),
        ],
        'device_2' => [
                timelet("9:00", "on"),
                timelet("10:05", "off"),
                timelet("12:10", "on"),
                timelet("13:36", "off"),
                timelet("17:35", "on"),
                timelet("21:00", "off"),
                timelet("21:10", "on"),
        ],
        'device_3' => [
                timelet("9:40", "on"),
                timelet("11:20", "off"),
                timelet("13:05", "on"),
                timelet("16:21", "off"),
                timelet("18:00", "on"),
                timelet("18:10", "off"),
                timelet("19:05", "on"),
                timelet("20:30", "off"),
                timelet("21:10", "on"),
        ],
        'device_4' => [
                timelet("19:30", "on"),
                timelet("20:55", "off"),
                timelet("21:30", "on"),
        ],
        'device_5' => [
        ]
];
```


Web Interface
----

Connect to your Raspberry PI web server:

`http://raspberry/index.php`

to see the schedule status.
You can also switch ON / OFF the scheduler for the current day.

Every day, when `reset.php` runs, it reset all the switches and re-set the application to default values (active=true).

