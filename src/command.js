const sketch = require("sketch");
const Settings = require("sketch/settings");
const Diff = require("diff");
const searchAllTextLayers = require("./utils.js");
const document = sketch.getSelectedDocument();

//const toArray = require('sketch-utils/to-array');
//const utils = require('sketch-utils');

// CHARACTER CONSTANTS
const ELLIPSIS = "\u2026";
const SPACE = "\u0020";		// Good ol' space
const WNBSP = "\u00A0";   // wide non breakable space
const NNBSP = "\u202F";   // narrow non breakable space
const OPENING_QUOTE = "«";
const CLOSING_QUOTE = "»";

// REGEXs
const NBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)(\s?)([?!;:])(\s|$)/gu;
const REGEX_ELLIPSIS = /(\.{2,5})|(\. \. \.)/gu;
const DOUBLE_QUOTE_OPEN = /"(\S)/gu;
const DOUBLE_QUOTE_CLOSE = /(\S)"/gu;
const NBSP_AFTER_QUOTE = /(\s|^|\'|\‘|\’)(«)(\s?)(\w+)/gu; 
const NBSP_BEFORE_QUOTE = /(\w+[.?!]?)(\s?)(»)(\s|[.,?!:]|$)/gu ;
const ANY_NUMBER_EXCEPT_ONE = /(?!1\b)d+/gu; 

// SETTINGS
let DEBUG = true;
let NBSP = WNBSP;       // Non breakable space as chosen by the user. Default : WNBSP
const settingsList = {
  AUTO_REPLACE : {
		ID : "AUTO_REPLACE",
		state : true,
		label : " Automatic substitutions"
  },
	USE_NNBSP : {
		ID : "USE_NNBSP",
		state : false,
		label : " Enable narrow non-breakable spaces \n Resulting text is not compatible with Safari"
  }
}


export function initPlugin(context) {

  if (Settings.settingForKey(settingsList.USE_NNBSP.ID) == undefined  ) {
		Settings.setSettingForKey(settingsList.USE_NNBSP.ID, false);
  }
  if (Settings.settingForKey(settingsList.AUTO_REPLACE.ID) == undefined ) {
		Settings.setSettingForKey(settingsList.AUTO_REPLACE.ID, true);
  }
}

export function replaceNNBSPbyWNBSP(context) {
  let textLayers = searchAllTextLayers.searchInLayer(document, true);
  textLayers.forEach(function (layer) {
	let newText = layer.text.replace(RegExp(NNBSP, 'gu'), WNBSP);
	layer.text = newText;
  });
}

export function replaceWNBSPbyNNBSP(context) {
  let textLayers = searchAllTextLayers.searchInLayer(document, true);
  textLayers.forEach(function (layer) {
	let newText = layer.text.replace(RegExp(WNBSP, 'gu'), NNBSP);
	layer.text = newText;
  });
}

function spaceInUnicode(str) {
	let newstring = str.replace(/(\u00A0|\u202F)/, function (match, p1) {
		return `${p1.charCodeAt().toString(16)}`;
	})
	return newstring
}

//fonction qui texte les regex : comparaison entre chaines après remplacement et chaines de référence
export function testRegex() {
  const referenceString =
	"L’Histoire ne fait rien, elle ne « possède » pas de « richesse immense », elle « ne livre point de combats » ! C’est plutôt l’homme, l’homme réel et vivant, qui fait tout cela, qui possède et combat. Ce n’est certes pas l’« Histoire » qui se sert de l’homme comme moyen pour œuvrer et parvenir – comme si elle était un personnage à part – à ses propres fins ; au contraire, elle n'est rien d’autre que l’activité de l'homme – et rien que de l'homme – poursuivant ses fins… Y a-t-il une suite à ce texte ?\n";

  const toFixString =
	"L’Histoire ne fait rien, elle ne « possède» pas de «richesse immense », elle « ne livre point de combats » ! C’est plutôt l’homme, l’homme réel et vivant, qui fait tout cela, qui possède et combat. Ce n’est certes pas l’« Histoire » qui se sert de l’homme comme moyen pour œuvrer et parvenir – comme si elle était un personnage à part – à ses propres fins ; au contraire, elle n'est rien d’autre que l’activité de l'homme - et rien que de l'homme -- poursuivant ses fins… Y a-t-il une suite à ce texte?\n";

  //const referenceString = "Y a-t-il une suite à ce texte ?";
  //const toFixString ="Y a-t-il une suite à ce texte ?";

	const fixedString = replaceString(toFixString).string;
  if (fixedString == referenceString) {
		console.log('test : succès');
  } else {
		
		console.log("référence \t", spaceInUnicode(referenceString), "résultat \t", spaceInUnicode(fixedString), "origine \t",spaceInUnicode(toFixString));
		console.log("\n\n test : erreur \n",  Diff.diffChars(fixedString, referenceString));
  }
}

export function createCheckbox(setting, frame) {
	let checkbox = NSButton.alloc().initWithFrame(frame);
	checkbox.setButtonType(NSSwitchButton);
	checkbox.setBezelStyle(0);
	checkbox.setTitle(setting.label);
	console.log(setting.ID, Settings.settingForKey(setting.ID));

	if (Settings.settingForKey(setting.ID) == true) {
		checkbox.setState(NSOnState);
	  }
	else {
		checkbox.setState(NSOffState);
	}
	return checkbox;
  }

export function saveSettings(setting, checkbox) {
	setting.state = (checkbox.state() == true); 
	Settings.setSettingForKey(setting.ID, setting.state);
	console.log(setting.ID, Settings.settingForKey(setting.ID));
	}

// fonction qui ouvre un menu de paramètres depuis le menu.
export function openSettings(context) {
	 
  let dialogWindow = 		COSAlertWindow.alloc().init();
  let pluginIconPath = 	context.plugin.urlForResourceNamed("icon.png").path();
  dialogWindow.setIcon(NSImage.alloc().initByReferencingFile(pluginIconPath));
  dialogWindow.setMessageText("French typography settings");
  
  let checkboxAutoReplace = 	createCheckbox(settingsList.AUTO_REPLACE, NSMakeRect(0, 0, 250, 23) );
  let checkboxUseNNBSP = 			createCheckbox(settingsList.USE_NNBSP, NSMakeRect(25, 0, 300, 56) );
  dialogWindow.addAccessoryView(checkboxAutoReplace);
  dialogWindow.addAccessoryView(checkboxUseNNBSP);

  dialogWindow.addButtonWithTitle("OK");
  dialogWindow.addButtonWithTitle("Cancel");

  let response = dialogWindow.runModal()
	if (response == "1000"){ 
		saveSettings(settingsList.AUTO_REPLACE, checkboxAutoReplace );
		saveSettings(settingsList.USE_NNBSP, checkboxUseNNBSP);

		if (Settings.settingForKey(settingsList.USE_NNBSP.ID) == true ) {
		NBSP = NNBSP;	
		replaceWNBSPbyNNBSP();
		} else {
		NBSP = WNBSP;	
		replaceNNBSPbyWNBSP();		
		}

	  return;
	}
	else {
	  return;
	}

}
 

export function replaceString(string) {

let count = 0;
string = string.replace(

									 // REMPLACEMENTS

				 
	// points de suspension

		REGEX_ELLIPSIS, function(match) {
			console.log("points de suspension");
			count++;
			return ELLIPSIS;		
		}).	

		//incises intelligentes
		replace(/([^0-9]\s)--?(\s?[^0-9])/, function ( match, $1, $2, $3) {
			console.log("incises intelligentes");
			count++;
			return `${p1}–${p2}`;
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
		replace(/(\s|\w|^)1\/2(\s|\w|$)/, function ( match, $1, $2) {
			count++;
			console.log("1/2");
			return `${$1}½${$2}`;
		}).

		replace(/(\s|\w|^)1\/3(\s|\w|$)/, function ( match, $1, $2) {
			count++;
			console.log("1/3");
			return `${$1}⅓${$2}`;
		}).

		replace(/(\s|\w|^)1\/4(\s|\w|$)/, function ( match, $1, $2) {
			count++;
			console.log("1/4");
			return `${$1}¼${$2}`;
		}).

		// 1er --> ordinal en exposant
		replace(/\b1er?\b/, function ( match, $1, $2) {
			count++;
			console.log("1er --> ordinal en exposant");
			return `1ᵉʳ`;
		}).

		//2e --> ordinal en exposant
		replace(/(?!1\b)(\d+)e\b/, function ( match, $1, $2) {
			count++;
			console.log("2e --> ordinal en exposant");
			return `${$1}ᵉ`;
		}).


//  ESPACES INSÉCABLES
	

		// remplace " par «
		replace(DOUBLE_QUOTE_OPEN, function( match, $1) {
			count++
			return OPENING_QUOTE + $1;
		}).

		//remplace " par »
		replace(DOUBLE_QUOTE_CLOSE, function( match, $1) {
			count++
			return $1 + CLOSING_QUOTE;
		}).

		//ajoute espace après «
		replace(NBSP_AFTER_QUOTE, function ( match, $1, $2, $3, $4) {
			console.log("//après «");
			count++;
			return  $1 + $2 + NBSP + $4;;
		}).

		//espaces fines insécables avant ? ! ; :
		replace(NBSP_DOUBLE_PUNCTUATION, function ( match, $1, $2, $3, $4) {
			console.log("espaces fines insécables avant ? ! ; :");
			count++;
			return `${$1}${NBSP}${$3}${$4}`;
		}).

		//ajoute espace avant »
		replace(NBSP_BEFORE_QUOTE, function ( match, $1, $2, $3, $4) {
			console.log("//avant »");
			count++;
			return $1 + NBSP + $3 + $4;
		}).

		//avant %
		replace(/(\d+)\s?\%/, function ( match, $1, $2) {
			console.log("//avant %");
			count++;
			return `${$1}${NBSP}%`;
		}).

		//avant $£€
		replace(/(\d+)\s?([$£€])/, function ( match, $1, $2, $3) {
			console.log("/avant $£€");
			count++;
			return `${$1}${NBSP}${$2}`;
		});
		// /(\d{3})( |\D|$)", function (match, p1, p2) {
		//     console.log('milliers')
		//     count++;
		//     return `${p1}${NNBSP}`;
		// })



  return {
	string: string,
	count: count
  };
}

//fonction qui prend le texte du calque sélectionné,invoque replaceString() et compte le temps écoulé. Invocable lors de textChanged
export function fixLayer(context) {

  // Si le remplacement automatique est désactivé dans les paramètres, on quitte la fonction
  let autoReplaceActivated = Settings.settingForKey(settingsList.AUTO_REPLACE.ID);

  if (autoReplaceActivated == false) {
	return;
  }

  const startDate = new Date();

  if (context.actionContext.old) {
	let selection = sketch.fromNative(context.actionContext.layer);

	let newText = replaceString(selection.text);
	selection.text = newText.string;

	let count = newText.count;
	const endDate = new Date();
	const duration = (endDate.getTime() - startDate.getTime()) / 1000;
	if (count > 0 && DEBUG) {
	  sketch.UI.message(
		`${count} substitution(s) done in ${duration}`,
		document
	  );
	}

	if (
	  Settings.settingForKey(settingsList.USE_NNBSP.ID) == true &&
	  RegExp(NNBSP).test(selection)
	) {
	  console.log("replaceWNBSPbyNNBSP n'a pas marché");
	}
	if (
	  Settings.settingForKey(settingsList.USE_NNBSP.ID) == false &&
	  RegExp(WNBSP).test(selection)
	) {
	  console.log("replaceNNBSPbyWNBSP n'a pas marché");
	}
  } else {
	throw new Error("unable to access selection");
  }
}
