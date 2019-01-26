var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(4)
  var sketchDebugger = __webpack_require__(6)
  var actions = __webpack_require__(8)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initPlugin = initPlugin;
exports.replaceNNBSPbyWNBSP = replaceNNBSPbyWNBSP;
exports.replaceWNBSPbyNNBSP = replaceWNBSPbyNNBSP;
exports.createCheckbox = createCheckbox;
exports.saveSettings = saveSettings;
exports.openSettings = openSettings;
exports.replaceString = replaceString;
exports.fixLayer = fixLayer;
//TODO
// mettre en place publication sur sketchpacks

// Scénario de test
// J'installe le plugin depuis le repo officiel
// J'insère t", le guillemet est bien remplacé
// j'ouvre les settings. setting 1 : activé, setting 2 : désactivé. 
//je crée du texte dans plusieurs pages. je change le setting 2. tous les espaces sont bien remplacés.
// je ferme  rouvre les settings, ils sont bien conservés.
// je ferme sketch et les reouvre, idem
// Aucun message n'apparait en bas de l'écran lors des remplacements.

var sketch = __webpack_require__(9);
var Settings = __webpack_require__(10);
var searchAllTextLayers = __webpack_require__(11);
var document = sketch.getSelectedDocument();

// LABELS
var LABEL_POPIN_TITLE = "French typography settings";
var LABEL_AUTO_REPLACE = " Automatic substitutions";
var LABEL_USE_NNBSP = " Narrow non-breakable spaces \n Resulting text is not compatible with Safari";

// CHARACTER CONSTANTS
var U = exports.U = {
	ELLIPSIS: "\u2026",
	SPACE: " ", // Good ol' space
	WNBSP: "\xA0", // wide non breakable space
	NNBSP: "\u202F", // narrow non breakable space
	OPENING_QUOTE: "«",
	CLOSING_QUOTE: "»"
	// REGEXs
};var NBSP_DOUBLE_PUNCTUATION = /([0-9A-Z_a-z]+(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?\xBB)?)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)([!:;\?])([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$)/g;
var REGEX_ELLIPSIS = /(\.{2,5})|(\. \. \.)/g;
var DOUBLE_QUOTE_OPEN = /("(?=[0-9A-Z_a-z]))|((?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|\^)"(?=(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])))/g;
var DOUBLE_QUOTE_CLOSE = /(?:([0-9A-Z_a-z])")|(?:((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))"(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$))/g;
var NBSP_AFTER_QUOTE = /([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|^|'|\u2018|\u2019)(\xAB)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)([0-9A-Z_a-z]+)/g;
var NBSP_BEFORE_QUOTE = /(?:([0-9A-Z_a-z])\xBB)|(?:((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))\xBB(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$))|(?:([0-9A-Z_a-z]|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])\xBB)/g;
var ANY_NUMBER_EXCEPT_ONE = /(?!1\b)d+/g;

// SETTINGS


var settingsList = exports.settingsList = {
	AUTO_REPLACE: {
		ID: "AUTO_REPLACE",
		label: LABEL_AUTO_REPLACE
	},
	USE_NNBSP: {
		ID: "USE_NNBSP",
		label: LABEL_USE_NNBSP
	},
	DEBUG: {
		ID: "DEBUG"
	}
};

function initPlugin(context) {

	try {
		if (NSFileManager.defaultManager().fileExistsAtPath(context.plugin.urlForResourceNamed("debug").path()) == 1) {
			Settings.setSettingForKey(settingsList.DEBUG.ID, true);
			console.log("debug mode : " + Settings.settingForKey(settingsList.DEBUG.ID));
		}
	} catch (error) {
		console.log("debug mode : " + Settings.settingForKey(settingsList.DEBUG.ID));
		Settings.setSettingForKey(settingsList.DEBUG.ID, false);
	}

	if (Settings.settingForKey(settingsList.AUTO_REPLACE.ID) == undefined) {
		console.log("test d'undef passé");

		Settings.setSettingForKey(settingsList.AUTO_REPLACE.ID, true);
	}

	if (Settings.settingForKey(settingsList.USE_NNBSP.ID) == undefined) {
		Settings.setSettingForKey(settingsList.USE_NNBSP.ID, false);
	}
}

function replaceNNBSPbyWNBSP(context) {
	var textLayers = searchAllTextLayers.searchInLayer(document, true);
	textLayers.forEach(function (layer) {
		var newText = layer.text.replace(RegExp(U.NNBSP, 'gu'), U.WNBSP);
		layer.text = newText;
	});
}

function replaceWNBSPbyNNBSP(context) {
	var textLayers = searchAllTextLayers.searchInLayer(document, true);
	textLayers.forEach(function (layer) {
		var newText = layer.text.replace(RegExp(U.WNBSP, 'gu'), U.NNBSP);
		layer.text = newText;
	});
}

function createCheckbox(setting, frame) {
	var checkbox = NSButton.alloc().initWithFrame(frame);
	checkbox.setButtonType(NSSwitchButton);
	checkbox.setBezelStyle(0);
	checkbox.setTitle(setting.label);

	if (Settings.settingForKey(setting.ID)) {
		checkbox.setState(NSOnState);
	} else {
		checkbox.setState(NSOffState);
	}
	return checkbox;
}

function saveSettings(setting, checkbox) {
	setting.state = checkbox.state() == true;
	Settings.setSettingForKey(setting.ID, setting.state);
}

// fonction qui ouvre un menu de paramètres depuis le menu.
function openSettings(context) {

	var dialogWindow = COSAlertWindow.alloc().init();
	var pluginIconPath = context.plugin.urlForResourceNamed("icon.png").path();
	dialogWindow.setIcon(NSImage.alloc().initByReferencingFile(pluginIconPath));
	dialogWindow.setMessageText(LABEL_POPIN_TITLE);

	var checkboxAutoReplace = createCheckbox(settingsList.AUTO_REPLACE, NSMakeRect(0, 0, 250, 23));
	var checkboxUseNNBSP = createCheckbox(settingsList.USE_NNBSP, NSMakeRect(25, 0, 300, 56));
	dialogWindow.addAccessoryView(checkboxAutoReplace);
	dialogWindow.addAccessoryView(checkboxUseNNBSP);

	// labels seem hardcoded: shortcuts like ESC don't work with any other labels.
	dialogWindow.addButtonWithTitle("OK");
	dialogWindow.addButtonWithTitle("Cancel");

	var response = dialogWindow.runModal();
	if (response == "1000") {
		saveSettings(settingsList.AUTO_REPLACE, checkboxAutoReplace);
		saveSettings(settingsList.USE_NNBSP, checkboxUseNNBSP);

		if (Settings.settingForKey(settingsList.USE_NNBSP.ID)) {
			U.NBSP = U.NNBSP;
			replaceWNBSPbyNNBSP();
		} else {
			U.NBSP = U.WNBSP;
			replaceNNBSPbyWNBSP();
		}

		return;
	} else {
		return;
	}
}

function replaceString(string) {

	var count = 0;
	//On vérifie le charactère choisi par l'utilisateur comme espace et on l'affecte
	U.NBSP = Settings.settingForKey(settingsList.USE_NNBSP.ID) == true ? U.NNBSP : U.WNBSP;

	string = string.replace(

	// REMPLACEMENTS


	// points de suspension

	REGEX_ELLIPSIS, function (match) {
		console.log("points de suspension");
		count++;
		return U.ELLIPSIS;
	}).

	//incises intelligentes
	replace(/([^0-9]\s)--?(\s?[^0-9])/, function (match, $1, $2, $3) {
		console.log("incises intelligentes");
		count++;
		return String($1) + "\u2013" + String($1);
	}).

	// puces en début de ligne
	replace(/(^|\n|\r)--?/, function (match, $1) {
		console.log("puces en début de ligne");
		count++;
		return "–";
	}).

	//  n° --> №
	replace(/n°/, function (match, $1, $2, $3) {
		count++;
		console.log("n°");
		return "№";
	}).

	// 1/2, 1/3, 1/4 --> caractères dédiés pour ces fractions
	replace(/(\s|\w|^)1\/2(\s|\w|$)/, function (match, $1, $2) {
		count++;
		console.log("1/2");
		return String($1) + "\xBD" + String($2);
	}).replace(/(\s|\w|^)1\/3(\s|\w|$)/, function (match, $1, $2) {
		count++;
		console.log("1/3");
		return String($1) + "\u2153" + String($2);
	}).replace(/(\s|\w|^)1\/4(\s|\w|$)/, function (match, $1, $2) {
		count++;
		console.log("1/4");
		return String($1) + "\xBC" + String($2);
	}).

	// 1er --> ordinal en exposant
	replace(/\b1er?\b/, function (match, $1, $2) {
		count++;
		console.log("1er --> ordinal en exposant");
		return "1\u1D49\u02B3";
	}).

	//2e --> ordinal en exposant
	replace(/(?!1\b)(\d+)e\b/, function (match, $1, $2) {
		count++;
		console.log("2e --> ordinal en exposant");
		return String($1) + "\u1D49";
	}).

	//  ESPACES INSÉCABLES


	// remplace " par «
	replace(DOUBLE_QUOTE_OPEN, function (match, $1, $2) {
		count++;

		var adj = $2 || "";
		//console.log(adj)
		return U.OPENING_QUOTE + adj;
	}).

	//remplace " par »
	replace(DOUBLE_QUOTE_CLOSE, function (match, $1, $2) {
		count++;
		var adj = $1 || $2 || "";
		return adj + U.CLOSING_QUOTE;
	}).

	//ajoute espace après «
	replace(NBSP_AFTER_QUOTE, function (match, $1, $2, $3, $4) {
		console.log("//après «");
		count++;
		return $1 + $2 + U.NBSP + $4;;
	}).

	//espaces fines insécables avant ? ! ; :
	replace(NBSP_DOUBLE_PUNCTUATION, function (match, $1, $2, $3, $4) {
		console.log("espaces fines insécables avant ? ! ; :");
		count++;
		return $1 + U.NBSP + $3 + $4;
	}).

	//ajoute espace avant »
	replace(NBSP_BEFORE_QUOTE, function (match, $1, $2) {
		console.log("//avant »");
		count++;
		var adj = $1 || $2 || "";
		console.log("adj : ", adj);
		return adj + U.NBSP + U.CLOSING_QUOTE;
	}).

	//avant %
	replace(/(\d+)\s?\%/, function (match, $1, $2) {
		console.log("//avant %");
		count++;
		return "" + String($1) + String(U.NBSP) + "%";
	}).

	//avant $£€
	replace(/(\d+)\s?([$£€])/, function (match, $1, $2, $3) {
		console.log("/avant $£€");
		count++;
		return "" + String($1) + String(U.NBSP) + String($2);
	});
	// /(\d{3})( |\D|$)", function (match, p1, p2) {
	//     console.log('milliers')
	//     count++;
	//     return `${p1}${U.NNBSP}`;
	// })


	return {
		string: string,
		count: count
	};
}

//fonction qui prend le texte du calque sélectionné,invoque replaceString() et compte le temps écoulé. Invocable lors de textChanged
function fixLayer(context) {

	// Si le remplacement automatique est désactivé dans les paramètres, on quitte la fonction
	var autoReplaceActivated = Settings.settingForKey(settingsList.AUTO_REPLACE.ID);

	if (!autoReplaceActivated) {
		return;
	}

	if (context.actionContext.old) {

		var startDate = new Date();
		var selection = sketch.fromNative(context.actionContext.layer);
		var newText = replaceString(selection.text);
		selection.text = newText.string;

		var count = newText.count;
		var endDate = new Date();
		var duration = (endDate.getTime() - startDate.getTime()) / 1000;
		if (count > 0 && Settings.settingForKey(settingsList.DEBUG.ID)) {
			sketch.UI.message(String(count) + " substitution(s) done in " + duration, document);
		}

		if (Settings.settingForKey(settingsList.USE_NNBSP.ID) && RegExp(U.NNBSP).test(selection)) {
			console.log("replaceWNBSPbyNNBSP n'a pas marché");
		}
		if (!Settings.settingForKey(settingsList.USE_NNBSP.ID) && RegExp(U.WNBSP).test(selection)) {
			console.log("replaceNNBSPbyWNBSP n'a pas marché");
		}
	} else {
		throw new Error("unable to access selection");
	}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(5)

module.exports.toArray = __webpack_require__(2)
module.exports.prepareStackTrace = __webpack_require__(1)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(1)
var toArray = __webpack_require__(2)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(7)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchInLayer = searchInLayer;
// traversal of the document module by https://github.com/thierryc/Sketch-Find-And-Replace
// Translated from SketchScript to JS.

var textLayers = [];
function searchInLayer(layer, inSymbolMaster) {
  // Determine the type of layer we're looking at

  switch (layer.type) {
    // Text layer - this is the important one
    case "Text":
      // log(layer.stringValue());

      textLayers.push(layer);

      break;

    // If we've started our search at the document root, loop through the pages
    case "Document":
      var documentPages = layer.pages;
      for (var i = 0; i < [documentPages.length]; i++) {
        searchInLayer(documentPages[i], false);
      }
      break;

    // Otherwise everything below that is an alias for layers anyway so we can treat them the same and loop through any sublayers
    case "Page":
    case "Group":
    case "Artboard":
      var sublayers = layer.layers;
      for (var i = 0; i < [sublayers.length]; i++) {
        searchInLayer(sublayers[i], false);
      }
      break;

    case MSSymbolMaster:
      if (inSymbolMaster != true) break;
      var sublayers = layer.layers;
      for (var i = 0; i < [sublayers.length]; i++) {
        searchInLayer(sublayers[i], inSymbolMaster);
      }
      break;

    // case MSSymbolInstance:
    //   searchInSymbols(layer);
    //   break;
  }
  return textLayers;
}

// function searchInSymbols(symbol) {
//     var existingOverrides = symbol.overrides() || NSDictionary.dictionary();
//     var overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);
//     var keys = overrides.allKeys();

//     for (var i = 0; i < keys.count(); i++) {
//       var index = keys.objectAtIndex(i);
//       if(overrides[index].class().isSubclassOfClass_(NSMutableDictionary.class()) ) {
//           overrides[index] = searchInSymbolsInception(overrides[index]);
//       } else if(overrides[index].class().isSubclassOfClass_(NSString.class()) ) {
//         if (overrides[index] && overrides[index].trim() && overrides[index].trim().match(matchRegex)) {
//           itemsMatched++;
//           overrides[index] = replaceValue(overrides[index], textToReplace);
//         }
//       }
//     }
//     symbol.overrides = overrides;
// }

// function searchInSymbolsInception(overrides) {
//   var keys = overrides.allKeys();
//   for (var i = 0; i < keys.count(); i++) {
//     var index = keys.objectAtIndex(i);
//     if(overrides[index].class().isSubclassOfClass_(NSMutableDictionary.class()) ) {
//         overrides[index] = searchInSymbolsInception(overrides[index]);
//     } else if(overrides[index].class().isSubclassOfClass_(NSString.class()) ) {
//       if (overrides[index].trim() && overrides[index].trim().match(matchRegex)) {
//         itemsMatched++;
//         overrides[index] = replaceValue(overrides[index], textToReplace);
//       }
//     }
//   }
//   return overrides;
// }

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['fixLayer'] = __skpm_run.bind(this, 'fixLayer');
that['onRun'] = __skpm_run.bind(this, 'default');
that['initPlugin'] = __skpm_run.bind(this, 'initPlugin');
that['use_NNBSP'] = __skpm_run.bind(this, 'use_NNBSP');
that['openSettings'] = __skpm_run.bind(this, 'openSettings')
