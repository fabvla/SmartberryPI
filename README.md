SmartberryPI
========

**SmartberryPI** is a simple PHP library for building a task scheduler for Automation and IoT installations based on Raspberry PI.


Introduction
----

In a recent installation we had the need to create effects of light and switch devices randomly.
Given that the stand has had to "animate" in particular time intervals, we planned on doing all thanks to Raspberry PI, with software written in PHP that allow you to define one or more daily programs on and off with ignition scheduled.
Defining different programs, each day is selected randomly from the program actually run, so visitors could see different behaviour every day.

The status of the engine can be seen in a simple web interface that display the status of all devices (current on/off) and with a master button is it possible to switch ON / OFF the whole process.


Installation
----

Copy this web application on any web server docroot (Apache or Nginx).
The program works with a web interface for monitoring the schedule status and task schedulers.

The task scheduler run on top of linux crontab. There's two commands to add on crontab: 

* `run.php`, will run every minute to check the timeline and perform actions.
* `reset.php`, will run once a day (you can choose when), that reset the timeline and rebuild it.

On bash type:

`crontab -e`

Than add these lines:

```

* * * * * php /path/to/project/run.php

0 12 * * * php /path/to/project/reset.php

```

In this example `reset.php` runs at 12.00 am every day (adjust to your needs).


Configuring Devices
----

First of all, configures your devices (each device corresponds to one GPIO Pin) inside `config/device.php`:

1. Copy `config/device.php.sample` to `config/device.php`
2. Edit `config/device.php` and map every device with a Name and GPIO PIN:


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

