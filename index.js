var webfontsGenerator = require('webfonts-generator');
var fs = require('fs');

module.exports = function(config) {
	var cssFileName = config.way + config.name + '.css';
	if(config.production) var files = config.productionFiles;
	else var files = config.files;
	if (fs.existsSync(cssFileName)) {
		var data = fs.readFileSync(cssFileName, 'utf8');
		var lines = data.split("\n");
		if (lines[lines.length - 1].indexOf(files.toString() + config.way + config.prefix) > -1) return;
	}
	webfontsGenerator({
		fontName: config.name,
		files: files,
		dest: config.way
	}, function(error) {
		fs.appendFile(cssFileName, '\r\n/*' + files.toString() + config.way + config.prefix + '*/', function(err) {});
	});
};