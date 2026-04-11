/**
 * @see https://www.barrykooij.com/live-reloading-for-wordpress-development/
 * @see https://browsersync.io/docs
 * @see https://browsersync.io/docs/options#option-proxy
 * @see https://browsersync.io/docs/options#option-watchOptions
 * 
 * @see https://browsersync.io/docs/gulp alternative with gulp
 */
const
	fs = require('fs'),
	path = require('path'),
	browserSync = require('browser-sync').create()

// configuration
const
	file = 'config.json',
	root = path.dirname(__dirname),
	path0 = path.resolve(__dirname, file),
	self = __dirname.replace(/\\/g, '/')
if (fs.statSync(path0).isFile()) {
	const configuration = JSON.parse(fs.readFileSync(path0, 'utf8'))
	let [, , target] = process.argv
	/**
	 * @type {{url: string, dir: string, browser: string}}
	 */
	let config = configuration[target]
	if (!config) {
		for (const [target0, config0] of Object.entries(configuration)) {
			if (config0.default) {
				config = config0
				target = target0
				break
			}
		}
	}
	// ...
	if (config) {
		const configuration = {
			logPrefix: target,
			proxy: config.url,
			// cwd: config.dir, // TODO remove - used during the initial development
			cwd: path.resolve(root, config.dir ?? ''),
			// port: config.port || 9033, // Using a custom port leads to an unpleasant delay between switches
			files: [
				// '**/*.*',
				'**/*.css',
				'**/*.gif',
				'**/*.htm',
				'**/*.html',
				'**/*.inc',
				'**/*.jpeg',
				'**/*.jpg',
				'**/*.js',
				// '**/*.json',
				// '**/*.mp3',
				// '**/*.mp4',
				'**/*.php',
				'**/*.png',
				'**/*.webp',
				// '!*.css.map',
				// '!*.less',
				// '!*.log',
				// '!*.sass',
				// '!*.scss',
				// '!*.sql',
				// '!*.ts',
				...(config.files ?? []),
			],
			ignore: [
				`${self}/*`,
				// '*.css.map',
				// '*.less',
				// '*.log',
				// '*.sass',
				// '*.scss',
				// '*.sql',
				// '*.ts',
				...(config.ignore ?? []),
			],
			// localOnly: true,
			// notify: true,
		}
		if (config.port) configuration.port = config.port
		if (config.delay) configuration.reloadDelay = config.delay
		if (config.start) configuration.startPath = config.start
		if (config.browser) configuration.browser = config.browser

		let error = undefined
		let start = end = 0
		do {
			error = undefined
			start = Date.now()
			try {
				browserSync.init(configuration)
			} catch (error0) {
				error = error0
			}
			end = Date.now()
			if (browserSync.active) {
				browserSync.cleanup()
				browserSync.reload()
			}
			configuration.open = false // Prevent a new tab from being open during the next initiation.
		} while (end - start > 2000) // If delta is higher than 2sec then it is most likely a time out error.
		// ...
		if (error) {
			if (error instanceof Error) throw error
			else throw new Error(error)
		}
	}
} else throw new Error(`The ${file} file is missing.`)
