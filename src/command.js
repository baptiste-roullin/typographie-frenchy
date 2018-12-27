// todo : rendre compatible que le param système de quote intelligent soit activé ou non.






const sketch = require("sketch");
const Settings = require("sketch/settings");
const Diff = require("diff");
const searchAllTextLayers = require("./utils.js");
const document = sketch.getSelectedDocument();

//const toArray = require('sketch-utils/to-array');
//const utils = require('sketch-utils');

// CHARECTHER CONSTANTS
const ELLIPSIS = "\u2026";
const SPACE = "\u0020";
const WNBSP = "\u00A0";   // wide non breakable space
const NNBSP = "\u202F";   // narrow non breakable space
const OPENING_QUOTE = "«";
const CLOSING_QUOTE = "»";

// REGEXs
const REGEX_NNBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)(\s?)([?!;:])(\s|$)/g;
const REGEX_ELLIPSIS = /\.{2,5}|\. \. \./g;
const ANY_NUMBER_EXCEPT_ONE = "(?!1\b)d+"; // positive lookahed or some weird-ass regex witchery
const DOUBLE_QUOTE_OPEN = '/(?: "(?=\w) )  | (?: (?<=\s|\A)"(?=\S) )/Sx';
const DOUBLE_QUOTE_CLOSE = '/(?: (?<=\w)" ) | (?: (?<=\S)"(?=\s|\Z) )/Sx';


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
		label : " Enable narrow non-breakable spaces (resulting text is not compatible with Safari"
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
	let newstring = str.replace(/(\u00A0|\u202F)/g, function (match, p1) {
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
  let checkboxUseNNBSP = 			createCheckbox(settingsList.USE_NNBSP, NSMakeRect(25, 0, 250, 23) );
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
  //console.log(Settings.settingForKey(settingsList.USE_NNBSP.ID), NBSP);

  // REMPLACEMENTS
  string = string
	// points de suspension
	.replace(REGEX_ELLIPSIS, function () {
	  console.log("points de suspension");
	  count++;
	  return ELLIPSIS;
	})
	//incises intelligentes
	.replace(/([^0-9]\s)--?(\s?[^0-9])/g, function (match, p1, p2, p3) {
	  console.log("incises intelligentes");
	  count++;
	  return `${p1}–${p2}`;
	})
	// puces en début de ligne
	.replace(/(^|\n|\r)--?/g, function (match, p1) {
	  console.log("puces en début de ligne");
	  count++;
	  return "–";
	})
	//  n° --> №
	.replace(/n°/g, function (match, p1, p2, p3) {
	  count++;
	  console.log("n°");
	  return "№";
	})
	// 1/2, 1/3, 1/4 --> caractères dédiés pour ces fractions
	.replace(/(\s|\w|^)1\/2(\s|\w|$)/g, function (match, p1, p2) {
	  count++;
	  console.log("1/2");
	  return `${p1}½${p2}`;
	})
	.replace(/(\s|\w|^)1\/3(\s|\w|$)/g, function (match, p1, p2) {
	  count++;
	  console.log("1/3");
	  return `${p1}⅓${p2}`;
	})
	.replace(/(\s|\w|^)1\/4(\s|\w|$)/g, function (match, p1, p2) {
	  count++;
	  console.log("1/4");
	  return `${p1}¼${p2}`;
	})
	// 1er --> ordinal en exposant
	.replace(/\b1er?\b/g, function (match, p1, p2) {
	  count++;
	  console.log("1er --> ordinal en exposant");
	  return `1ᵉʳ`;
	})
	//2e --> ordinal en exposant
	.replace(/(?!1\b)(\d+)e\b/g, function (match, p1, p2) {
	  count++;
	  console.log("2e --> ordinal en exposant");
	  return `${p1}ᵉ`;
	});

  //  ESPACES INSÉCABLES
  string = string
	//espaces fines insécables avant ? ! ; :
	.replace(REGEX_NNBSP_DOUBLE_PUNCTUATION, function (match, p1, p2, p3, p4) {
	  console.log("espaces fines insécables avant ? ! ; :");
	  count++;
	  return `${p1}${NBSP}${p3}${p4}`;
	})
	//après «
	.replace(/(\s|^)(«)(\s?)(\w+)/g, function (match, p1, p2, p3, p4) {
	  console.log("//après «");
	  count++;
	  return `${p1}${OPENING_QUOTE}${NBSP}${p4}`;
	})
	//avant »
	.replace(/(\w+[.?!]?)(\s?)(»)(\s|[.,?!:]|$)/g, function (match, p1, p2, p3, p4) {
	  console.log("//avant »");
	  count++;
	  return `${p1}${NBSP}${CLOSING_QUOTE}${p4}`;
	})
	//avant %
	.replace(/(\d+)\s?\%/g, function (match, p1, p2) {
	  console.log("//avant %");
	  count++;
	  return `${p1}${NBSP}%`;
	})
	//avant $£€
	.replace(/(\d+)\s?([$£€])/g, function (match, p1, p2, p3) {
	  console.log("/avant $£€");
	  count++;
	  return `${p1}${NBSP}${p2}`;
	});
  // .replace(/(\d{3})( |\D|$)/g, function (match, p1, p2) {
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
	console.log(Settings.settingForKey(settingsList.AUTO_REPLACE.ID));

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
