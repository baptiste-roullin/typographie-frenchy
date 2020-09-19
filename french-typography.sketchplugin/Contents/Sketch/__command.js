var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/command.js":
/*!************************!*\
  !*** ./src/command.js ***!
  \************************/
/*! exports provided: U, settingsList, initPlugin, replaceNNBSPbyWNBSP, replaceWNBSPbyNNBSP, createCheckbox, saveSettings, openSettings, replaceString, fixLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingsList", function() { return settingsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPlugin", function() { return initPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceNNBSPbyWNBSP", function() { return replaceNNBSPbyWNBSP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceWNBSPbyNNBSP", function() { return replaceWNBSPbyNNBSP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCheckbox", function() { return createCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSettings", function() { return saveSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openSettings", function() { return openSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceString", function() { return replaceString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixLayer", function() { return fixLayer; });
//TODO
// Ajouter licence
// Scénario de test
// J'installe le plugin depuis le repo officiel
// J'insère t", le guillemet est bien remplacé
// j'ouvre les settings. setting 1 : activé, setting 2 : désactivé.
//je crée du texte dans plusieurs pages. je change le setting 2. tous les espaces sont bien remplacés.
// je ferme  rouvre les settings, ils sont bien conservés.
// je ferme sketch et les reouvre, idem
// Aucun message n'apparait en bas de l'écran lors des remplacements.
var sketch = __webpack_require__(/*! sketch */ "sketch");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var searchAllTextLayers = __webpack_require__(/*! ./utils.js */ "./src/utils.js");

var document = sketch.getSelectedDocument(); // LABELS

var LABEL_POPIN_TITLE = 'French typography settings';
var LABEL_AUTO_REPLACE = ' Automatic substitutions';
var LABEL_USE_NNBSP = ' Narrow non-breakable spaces \n Resulting text is not compatible with Safari'; // CHARACTER CONSTANTS

var U = {
  ELLIPSIS: "\u2026",
  SPACE: " ",
  // Good ol' space
  WNBSP: "\xA0",
  // wide non breakable space
  NNBSP: "\u202F",
  // narrow non breakable space
  OPENING_QUOTE: '«',
  CLOSING_QUOTE: '»'
}; // REGEXs

var NBSP_DOUBLE_PUNCTUATION = /([0-9A-Z_a-z]+(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?\xBB)?)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)([!:;\?])([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$)/g;
var REGEX_ELLIPSIS = /(\.{2,5})|(\. \. \.)/g;
var DOUBLE_QUOTE_OPEN = /("(?=[0-9A-Z_a-z]))|((?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|\^)"(?=(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])))/g;
var DOUBLE_QUOTE_CLOSE = /(?:([0-9A-Z_a-z])")|(?:((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))"(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$))/g;
var NBSP_AFTER_QUOTE = /([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|^|'|\u2018|\u2019)(\xAB)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)([0-9A-Z_a-z]+)/g;
var NBSP_BEFORE_QUOTE = /(?:([0-9A-Z_a-z])\xBB)|(?:((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))\xBB(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$))|(?:([0-9A-Z_a-z]|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])\xBB)/g;
var ANY_NUMBER_EXCEPT_ONE = /(?!1\b)d+/g; // SETTINGS

var settingsList = {
  AUTO_REPLACE: {
    ID: 'AUTO_REPLACE',
    label: LABEL_AUTO_REPLACE
  },
  USE_NNBSP: {
    ID: 'USE_NNBSP',
    label: LABEL_USE_NNBSP
  },
  DEBUG: {
    ID: 'DEBUG'
  }
};
function initPlugin(context) {
  try {
    if (NSFileManager.defaultManager().fileExistsAtPath(context.plugin.urlForResourceNamed('debug').path()) == 1) {
      Settings.setSettingForKey(settingsList.DEBUG.ID, true);
      console.log('debug mode : ' + Settings.settingForKey(settingsList.DEBUG.ID));
    }
  } catch (error) {
    console.log('debug mode : ' + Settings.settingForKey(settingsList.DEBUG.ID));
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
} // fonction qui ouvre un menu de paramètres depuis le menu.

function openSettings(context) {
  var dialogWindow = COSAlertWindow.alloc().init();
  var pluginIconPath = context.plugin.urlForResourceNamed('icon.png').path();
  dialogWindow.setIcon(NSImage.alloc().initByReferencingFile(pluginIconPath));
  dialogWindow.setMessageText(LABEL_POPIN_TITLE);
  var checkboxAutoReplace = createCheckbox(settingsList.AUTO_REPLACE, NSMakeRect(0, 0, 250, 23));
  var checkboxUseNNBSP = createCheckbox(settingsList.USE_NNBSP, NSMakeRect(25, 0, 300, 56));
  dialogWindow.addAccessoryView(checkboxAutoReplace);
  dialogWindow.addAccessoryView(checkboxUseNNBSP); // labels seem hardcoded: shortcuts like ESC don't work with any other labels.

  dialogWindow.addButtonWithTitle('OK');
  dialogWindow.addButtonWithTitle('Cancel');
  var response = dialogWindow.runModal();

  if (response == '1000') {
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
  var count = 0; //On vérifie le charactère choisi par l'utilisateur comme espace et on l'affecte

  U.NBSP = Settings.settingForKey(settingsList.USE_NNBSP.ID) == true ? U.NNBSP : U.WNBSP;
  string = string.replace( // REMPLACEMENTS
  // points de suspension
  REGEX_ELLIPSIS, function (match) {
    console.log('points de suspension');
    count++;
    return U.ELLIPSIS;
  }) //incises intelligentes
  .replace(/([^0-9]\s)--?(\s?[^0-9])/, function (match, $1, $2, $3) {
    console.log('incises intelligentes');
    count++;
    return "".concat($1, "\u2013").concat($1);
  }) // puces en début de ligne
  .replace(/(^|\n|\r)--?/, function (match, $1) {
    console.log('puces en début de ligne');
    count++;
    return '–';
  }) //  n° --> №
  .replace(/n°/, function (match, $1, $2, $3) {
    count++;
    console.log('n°');
    return '№';
  }) // 1/2, 1/3, 1/4 --> caractères dédiés pour ces fractions
  .replace(/(\s|\w|^)1\/2(\s|\w|$)/, function (match, $1, $2) {
    count++;
    console.log('1/2');
    return "".concat($1, "\xBD").concat($2);
  }).replace(/(\s|\w|^)1\/3(\s|\w|$)/, function (match, $1, $2) {
    count++;
    console.log('1/3');
    return "".concat($1, "\u2153").concat($2);
  }).replace(/(\s|\w|^)1\/4(\s|\w|$)/, function (match, $1, $2) {
    count++;
    console.log('1/4');
    return "".concat($1, "\xBC").concat($2);
  }) // 1er --> ordinal en exposant
  .replace(/\b1er?\b/, function (match, $1, $2) {
    count++;
    console.log('1er --> ordinal en exposant');
    return "1\u1D49\u02B3";
  }) //2e --> ordinal en exposant
  .replace(/(?!1\b)(\d+)e\b/, function (match, $1, $2) {
    count++;
    console.log('2e --> ordinal en exposant');
    return "".concat($1, "\u1D49");
  }).replace(/(\w)\'/, function (match, $1, $2, $3) {
    console.log('apostrophe droit par apostrophe courbe');
    count++;
    return $1 + "\u2019";
  }) //  ESPACES INSÉCABLES
  // remplace " par «
  .replace(DOUBLE_QUOTE_OPEN, function (match, $1, $2) {
    count++;
    var adj = $2 || ''; //console.log(adj)

    return U.OPENING_QUOTE + adj;
  }) //remplace " par »
  .replace(DOUBLE_QUOTE_CLOSE, function (match, $1, $2) {
    count++;
    var adj = $1 || $2 || '';
    return adj + U.CLOSING_QUOTE;
  }) //ajoute espace après «
  .replace(NBSP_AFTER_QUOTE, function (match, $1, $2, $3, $4) {
    console.log('//après «');
    count++;
    return $1 + $2 + U.NBSP + $4;
  }) //espaces fines insécables avant ? ! ; :
  .replace(NBSP_DOUBLE_PUNCTUATION, function (match, $1, $2, $3, $4) {
    console.log('espaces fines insécables avant ? ! ; :');
    count++;
    return $1 + U.NBSP + $3 + $4;
  }) //ajoute espace avant »
  .replace(NBSP_BEFORE_QUOTE, function (match, $1, $2) {
    console.log('//avant »');
    count++;
    var adj = $1 || $2 || '';
    console.log('adj : ', adj);
    return adj + U.NBSP + U.CLOSING_QUOTE;
  }) //avant %
  .replace(/(\d+)\s?\%/, function (match, $1, $2) {
    console.log('//avant %');
    count++;
    return "".concat($1).concat(U.NBSP, "%");
  }) //avant $£€
  .replace(/(\d+)\s?([$£€])/, function (match, $1, $2, $3) {
    console.log('/avant $£€');
    count++;
    return "".concat($1).concat(U.NBSP).concat($2);
  }); // /(\d{3})( |\D|$)", function (match, p1, p2) {
  //     console.log('milliers')
  //     count++;
  //     return `${p1}${U.NNBSP}`;
  // })

  return {
    string: string,
    count: count
  };
} //fonction qui prend le texte du calque sélectionné,invoque replaceString() et compte le temps écoulé. Invocable lors de textChanged

function fixLayer(context) {
  // Si le remplacement automatique est désactivé dans les paramètres, on quitte la fonction
  var autoReplaceActivated = Settings.settingForKey(settingsList.AUTO_REPLACE.ID);

  if (!autoReplaceActivated) {
    return;
  }

  var startDate = new Date(); //let selection = sketch.fromNative(context.actionContext.layer);

  var selection = document.selectedLayers.layers[0];
  console.log(selection);
  var newText = replaceString(selection.text);
  selection.text = newText.string;
  var count = newText.count;
  var endDate = new Date();
  var duration = (endDate.getTime() - startDate.getTime()) / 1000;

  if (count > 0 && Settings.settingForKey(settingsList.DEBUG.ID)) {
    sketch.UI.message("".concat(count, " substitution(s) done in ").concat(duration), document);
  }

  if (Settings.settingForKey(settingsList.USE_NNBSP.ID) && RegExp(U.NNBSP).test(selection)) {
    console.log("replaceWNBSPbyNNBSP n'a pas marché");
  }

  if (!Settings.settingForKey(settingsList.USE_NNBSP.ID) && RegExp(U.WNBSP).test(selection)) {
    console.log("replaceNNBSPbyWNBSP n'a pas marché");
  }
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: searchInLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchInLayer", function() { return searchInLayer; });
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
} // function searchInSymbols(symbol) {
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

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['fixLayer'] = __skpm_run.bind(this, 'fixLayer');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['initPlugin'] = __skpm_run.bind(this, 'initPlugin');
globalThis['use_NNBSP'] = __skpm_run.bind(this, 'use_NNBSP');
globalThis['openSettings'] = __skpm_run.bind(this, 'openSettings')

//# sourceMappingURL=__command.js.map