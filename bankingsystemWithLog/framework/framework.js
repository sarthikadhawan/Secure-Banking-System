'use strict';


/**
 * Global Variable declarations
 */
var fs = require('fs'),
    dust = require('dustjs-helpers'),
    path = require('path'),
    PragmaLogger = require('pragma-logger'),
    logger = new PragmaLogger({
        logger: {
            charset: 'utf8',
            levels: {
                debug: './logs/%pid_debug_%y-%m-%d.log',
                error: './logs/%pid_error_%y-%m-%d.log',
                warn: './logs/%pid_warn_%y-%m-%d.log',
                trace: './logs/%pid_trace_%y-%m-%d.log',
                info: './logs/%pid_info_%y-%m-%d.log'
            },
            messageFormat: '%t| %name :: %lvl | %msg'
        }
    }, '[Banking system]');

/*Filling up Assets*/

/**
 * render: Function getLogger. returns a logger object
 * @return: logger object
 */
function getLogger() {
    return logger;
}

/**
 * fillAsstes : Function adds all the assets in the variable
 *
 */

function fillAssets() {
    var assets = {};

    assets.css = fs.readdirSync(path.join(__dirname, '../assets/css'));
    assets.js = fs.readdirSync(path.join(__dirname, '../assets/js'));
    //assets.fonts = fs.readdirSync(path.join(__dirname, 'public/fonts'));
    assets.images = fs.readdirSync(path.join(__dirname, '../assets/images'));
    for (var i = 0; i < assets.css.length; i++) {
        assets.css[i] = '<link rel="stylesheet" type="text/css" href="/css/' + assets.css[i] + '"/>';
    }
    /*
	for (i = 0; i < assets.fonts.length; i++) {
    	assets.fonts[i] = '<link rel="stylesheet" type="text/css" href="/fonts/' + assets.fonts[i] + '"/>';
	}
	*/
    for (i = 0; i < assets.js.length; i++) {
        assets.js[i] = '<script src="/js/' + assets.js[i] + '"></script>';
    }
    assets.css = assets.css.join('');
    //assets.fonts = assets.fonts.join('');
    //assets.css = assets.css + assets.fonts;
    assets.js = assets.js.join('');

    return assets;
}


/**
 * getDustTemplate function compiles a dust template with data and returns compiled html
 * @param template: the dust template used for compilation
 * @param data: json data to be used for compilation
 * @param compiledHTML : Compiled HTML if error occurs send the error msg
 */
function compileDustTemplate(template, data, callback) {
    logger.debug("Framework: compileDustTemplate Called");
    //try {
    if (!template) {
        logger.error("ERROR: Template not passed");
        callback("");
        return;
    }
    if (!data) {
        logger.error("ERROR: Data not passed");
        callback("");
        return;
    }
    //Get the template path
    var layout_path = path.join(__dirname, '../templates/layout.dust'),
        layout = fs.readFileSync(layout_path).toString();
    dust.loadSource(dust.compile(layout, "layout", true));

    var template_path = path.join(__dirname, '../templates/' + template + '.dust');
    template = fs.readFileSync(template_path).toString();

    //If all the parameters are passed then do the compilation
    dust.loadSource(dust.compile(template, "compiled", true));

    var parsedData = {};
    parsedData.data = data;

    dust.render("compiled", parsedData, function (err, out) {
        if (err !== null) {
            logger.error("ERROR: Dust Template Failed compilation, Template: " + template + " Data: " + JSON.stringify(data));
            out = "";
        }
        callback(out);
    });
    //} catch (e) {
    //logger.error("ERROR: Dust Compilation or JSON Data Parse failed: ",e.message);
    //callback("");
    //}
}




/**
 * render: Function getLang to retrive lang file
 * @return: lang JSON
 */
function getLang() {
    var lang = "en_US",
        lang_path = path.join(__dirname, '../lang/' + lang + '.json');
    return JSON.parse(fs.readFileSync(lang_path).toString());
}

/**
 * render: Function render is attached to give controllers render function for dust
 * @param: res Object
 * @param: template name
 * @param: data
 * @return: sends compiled dust
 */

function renderPage(res, template, data) {
    logger.debug("Framework: renderPage Called");
    data.lang = this.getLang();
    this.compileDustTemplate(template, data, function (response) {
        var assets = fillAssets();
        var page = '<!DOCTYPE HTML><html><head><title>Pensieve</title><link type="text/css" rel="stylesheet" href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css" /><link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300"><link href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"><link href="//netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet"><link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"><script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script><script src="http://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js" type="application/javascript"></script><script src="http://maps.googleapis.com/maps/api/js"></script>' + assets.css + "</head><body>" + response + assets.js + "</body></html>";
        res.send(page);
    });
}

exports.compileDustTemplate = compileDustTemplate;
exports.renderPage = renderPage;
exports.getLang = getLang;
exports.getLogger = getLogger;
