/**
 * @deprecated @since PM (17.12.2024)
 * I figured out how to do it with solely browser-sync. @see main.js
 * Later I might reactivate gulp to enable features such as auto-compression of code.
 * @requires gulp
 */
const
	path = require('node:path'),
	fs = require('node:fs'),
	{ series, watch } = require('gulp'),
	browserSync = require('browser-sync').create()

// configuration
const
	file = 'configuration.json',
	path0 = path.resolve(__dirname, file)
if (fs.statSync(path0).isFile()) {
	const
		[, , option] = process.argv,
		configuration = JSON.parse(fs.readFileSync(path0, 'utf8'))
	/**
	 * @type {{url: string, dir: string}}
	 */
	let config = configuration[option]
	if (!config) {
		for (const config0 of Object.values(configuration)) {
			if (config0.default) {
				config = config0
				break
			}
		}
	}
	// ...
	if (config) {
		/**
		 * @see https://gulpjs.com/docs/en/api/src
		 * @see https://gulpjs.com/docs/en/api/dest
		 * @see https://gulpjs.com/docs/en/getting-started/creating-tasks
		 */
		exports.default = series(cb => {
			// Serve files from the root of this project
			// @see https://browsersync.io/docs/options
			// @see https://browsersync.io/docs/options#option-proxy
			browserSync.init({
				port: configuration.port || 9033,
				proxy: configuration.url,
			})
			// @see https://gulpjs.com/docs/en/api/watch
			watch(
				[
					'**/*.*',
					// '**/*.css',
					// '**/*.html',
					// '**/*.inc',
					// '**/*.jpeg',
					// '**/*.jpg',
					// '**/*.js',
					// '**/*.php',
					// '**/*.png',
					// '**/*.webp',
					'!*.log',
					'!*.less',
					'!*.css.map',
					'!*.sql',
				],
				{ cwd: configuration.dir }
			).on('change', browserSync.reload)

			cb()
		})
	}
} else throw new Error(`The ${file} file is missing.`)
