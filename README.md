# WebReloader

## Introduction
This project can be used to hot-reload any non static web application during the development stage. 
For example applications written in PHP such as WordPress, Joomla and PrestaShop.<br>
This is done by **mirroring** the web application in 3 main steps:
1. The url normally used to access the web application is **proxied**.
2. The base directory of the web application is **watched**.
3. Once a modification is detected in the base directory, the proxy is reloaded.

It is based on [browser-sync](https://browsersync.io/).


## Requirements
You need to have [Node.js and npm](https://nodejs.org/) installed on your pc.
To make sure they are available run the following commands:
```ps
$ node --version
$ npm --version
```


## Installation
First some definitions.
1. **root**: The directory containing your web application.
2. **webreloader**: The directory containing the code in charge of the hot-reload. Aka this project.

### Using Git (recommended)
1. Open your console.
2. Navigate to the **root**.
	 ```ps
	 $ cd __PATH_TO_ROOT__
	 ```
3. Run the following commands:
	 1. If the **root** is **already** using GIT
		```ps
		$ git submodule add -- https://github.com/tapmeppe/webreloader.git webreloader
		$ cd webreloader
		$ npm install
		```
	 2. Otherwise
		```ps
		$ git clone https://github.com/tapmeppe/webreloader.git webreloader
		$ cd webreloader
		$ npm install
		```

### Manually
1. [Download the webreloader project as a .zip file](https://github.com/tapmeppe/webreloader/archive/refs/heads/main.zip).
2. Extract the .zip file. The result will be a single **non-empty** folder.
3. Rename the newly created folder to '**webreloader**'.
4. Move the folder 'webreloader' to your web application. Place it directly under the **root**.
5. Run the following commands:
	 ```ps
	 $ cd __PATH_TO_ROOT__/webreloader
	 $ npm install
	 ```


## Configuration
Create a file named '**config.json**', then paste the content of the file 'config.template.json' in the newly create file.<br>
Each node in the config file represents a **mirror**.
Each **mirror** can be described with the following information:
- Mandatory
	- The __TARGET__: The key used as parameter to identify the mirror to load.
	- The __URL__ to be proxied.
- Optional
	- The __BASE_DIRECTORY__ (`dir`) represents the relative path to the base directory to watch. 
		- It is relative to the **root**.
		- The **root** is the **parent directory** of the **webreloader**.
		- If unset the **root** itself will be used.
	- The __BROWSER__ key is optional. If set the given browser(s), if installed, will be used. More information [here](https://browsersync.io/docs/options#option-browser).
	- The __DEFAULT__ key is optional. If set the given mirror will run implicitly if no target is entered.
	- The __FILES__ is an optional list of glob patterns to watch.
		- By default the following patterns are used:
			- '**/*.css'
			- '**/*.gif'
			- '**/*.htm'
			- '**/*.html'
			- '**/*.inc'
			- '**/*.jpeg'
			- '**/*.jpg'
			- '**/*.js'
			- '**/*.php'
			- '**/*.png'
			- '**/*.webp'
		- Anything else must be added if need be.
	- The __IGNORE__ is an optional list of glob patterns to **ignore**.
		- Currently only the **webreloader** is ignored.
		- Anything else must be added if need be.
	- The __PORT__ is optional and used to set a specific proxy port.


## Start a mirror
To start a given mirror run the following command:
```ps
$ cd __PATH_TO_ROOT__/webreloader
$ npm start [__TARGET__]
```


---
### tapmeppe work - Patrick Meppe (16.01.2025)
