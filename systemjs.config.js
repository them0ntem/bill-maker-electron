/**
 * System configuration for Angular 2
 */
(function (global) {
	var map = {
		'app': 'app',
		'@angular': 'node_modules/@angular',
		'rxjs': 'node_modules/rxjs',
		'nconf': 'node_modules/nconf/lib/nconf.js',
		'moment': 'node_modules/moment/moment.js'
	};

	var packages = {
		'app': {main: 'main.js', defaultExtension: 'js'},
		'rxjs': {defaultExtension: 'js'},
		'nconf': {format: 'js', defaultExtension: 'js'},
	};
	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade'
	];

	function packIndex(pkgName) {
		packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
	}

	function packUmd(pkgName) {
		packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
	}

	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	ngPackageNames.forEach(setPackageConfig);
	var config = {
		map: map,
		packages: packages
	};
	System.config(config);
})(this);
