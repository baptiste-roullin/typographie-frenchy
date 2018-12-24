// todo : rendre compatible que le param système de quote intelligent soit activé ou non.
// inspiration :  https://github.com/mathieudutour/git-sketch-plugin/blob/master/src/preferences.js
// vraie UI  pour les dialogs

// déplacer les tests de init() à 'run script'

//installer
// désactiver : plist pas supprimé
//réactiver
//réinstaller


const sketch = require("sketch");
const Settings = require("sketch/settings");
const JsDiff = require("diff");
const searchAllTextLayers = require("./utils.js");
const document = sketch.getSelectedDocument();

//const toArray = require('sketch-utils/to-array');
//const utils = require('sketch-utils');

// CHARECTHER CONSTANTS
const ELLIPSIS = "\u2026";
const SPACE = "\u0020";
const WNBSP = "\u00A0";   // wide non breakable space
const NNBSP = "\u202F";   // narrow non breakable space
const NBSP = WNBSP;       // Non breakable space as chosen by the user. Default : WNBSP
const OPENING_QUOTE = "«";
const CLOSING_QUOTE = "»";

// REGEXs
const REGEX_NNBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)( ?)([?!;:])(\s|$)/gu;
const REGEX_ELLIPSIS = /\.{2,5}|\. \. \./gu;
const ANY_NUMBER_EXCEPT_ONE = "(?!1\b)d+"; // positive lookahed or some weird-ass regex witchery
const DOUBLE_QUOTE_OPEN = '/(?: "(?=\w) )  | (?: (?<=\s|\A)"(?=\S) )/Sx';
const DOUBLE_QUOTE_CLOSE = '/(?: (?<=\w)" ) | (?: (?<=\S)"(?=\s|\Z) )/Sx';

const settingsList = {
  autoReplace : {
		ID : "autoReplace",
		state : true,
		label : " Remplacement automatique"
  },
	use_NNBSP : {
		ID : "USE_NNBSP",
		state : false,
		label : " Utiliser des espaces fines insécables"
  }
}

//FLAGS
let DEBUG = true;

export function initPlugin(context) {
  if (DEBUG) {
   } 
	 testRegex();

console.log('test');
  if (!Settings.settingForKey("USE_NNBSP")) {
    Settings.setSettingForKey("USE_NNBSP", false);
  }
  if (!Settings.settingForKey("autoReplace")) {
    Settings.setSettingForKey("autoReplace", true);
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

//fonction qui texte les regex : comparaison entre chaines après remplacement et chaines de référence
export function testRegex(context) {
  const referenceString =
	"L’Histoire ne fait rien, elle ne « possède » pas de « richesse immense », elle « ne livre point de combats » ! C’est plutôt l’homme, l’homme réel et vivant, qui fait tout cela, qui possède et combat. Ce n’est certes pas l’« Histoire » qui se sert de l’homme comme moyen pour œuvrer et parvenir – comme si elle était un personnage à part – à ses propres fins ; au contraire, elle n'est rien d’autre que l’activité de l'homme – et rien que de l'homme – poursuivant ses fins… Y a-t-il une suite à ce texte ?\n";

  const toFixString =
	"L’Histoire ne fait rien, elle ne « possède» pas de «richesse immense », elle « ne livre point de combats » ! C’est plutôt l’homme, l’homme réel et vivant, qui fait tout cela, qui possède et combat. Ce n’est certes pas l’« Histoire » qui se sert de l’homme comme moyen pour œuvrer et parvenir – comme si elle était un personnage à part – à ses propres fins ; au contraire, elle n'est rien d’autre que l’activité de l'homme - et rien que de l'homme -- poursuivant ses fins… Y a-t-il une suite à ce texte?\n";

  //const referenceString = "Y a-t-il une suite à ce texte ?";
  //const toFixString ="Y a-t-il une suite à ce texte ?";

  const fixedString = replaceString(toFixString).string;
  if (fixedString == referenceString) {
	console.log('test : succès');
  } else {
	console.log(`\n\n test : erreur \n`, JsDiff.diffChars(fixedString, referenceString));
  }
}


export function createCheckbox(setting, frame) {
	let checkbox = NSButton.alloc().initWithFrame(frame);
	checkbox.setButtonType(NSSwitchButton);
	checkbox.setBezelStyle(0);
	checkbox.setTitle(setting.label);
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

	}

// fonction qui ouvre un menu de paramètres depuis le menu.
export function openSettings(context) {
	 
  let dialogWindow = 		COSAlertWindow.alloc().init();
  let pluginIconPath = 	context.plugin.urlForResourceNamed("icon.png").path();
  dialogWindow.setIcon(NSImage.alloc().initByReferencingFile(pluginIconPath));
  dialogWindow.setMessageText("Paramètres");
  
  let checkboxAutoReplace = 	createCheckbox(settingsList.autoReplace, NSMakeRect(0, 0, 250, 23) );
  let checkboxUseNNBSP = 			createCheckbox(settingsList.use_NNBSP, NSMakeRect(25, 0, 250, 23) );
  dialogWindow.addAccessoryView(checkboxAutoReplace);
  dialogWindow.addAccessoryView(checkboxUseNNBSP);
  

  dialogWindow.addButtonWithTitle("Valider");
  dialogWindow.addButtonWithTitle("Annuler");

  let response = dialogWindow.runModal()

	if (response == "1000"){ 
		saveSettings(settingsList.autoReplace, checkboxAutoReplace );
		saveSettings(settingsList.autoReplace, checkboxUseNNBSP);

	  return;
	}
	else {
	  return;
	}



}
 
export function use_NNBSP(context) {
  var options = [
	"Respecter la convention et utiliser des espaces fines insécables",
	"Rendre le texte compatible avec Safari (par défaut)"
  ];
  var selection = sketch.UI.getSelectionFromUser(
	"Les espaces insécables fines ne sont pas gérées par Safari. Voulez-vous que ce plugin les utilise quand même ?  \n",
	options
  );

  // si false : l'utilisateur a cliqué sur cancel, donc on arrête la fonction.
  if (!selection[2]) {
	return
  }

  if (selection[1] == "0") {
	// s'il répond oui (première réponse dans l'array)
	Settings.setSettingForKey("USE_NNBSP", true);
	const NBSP = NNBSP;
	console.log(Settings.settingForKey("USE_NNBSP"), NBSP);

	replaceWNBSPbyNNBSP();
  } else {
	Settings.setSettingForKey("USE_NNBSP", false);
	const NBSP = WNBSP;
	console.log(Settings.settingForKey("USE_NNBSP"), NBSP);

	replaceNNBSPbyWNBSP();
  }
  //console.log("param :", Settings.settingForKey("USE_NNBSP"));
}

export function replaceString(string) {
  let count = 0;
  //console.log(Settings.settingForKey("USE_NNBSP"), NBSP);

  // REMPLACEMENTS
  string = string
	// points de suspension
	.replace(REGEX_ELLIPSIS, function () {
	  console.log("points de suspension");
	  count++;
	  return ELLIPSIS;
	})
	//incises intelligentes
	.replace(/([^0-9]\s)--?(\s?[^0-9])/gu, function (match, p1, p2, p3) {
	  console.log("incises intelligentes");
	  count++;
	  return `${p1}–${p2}`;
	})
	// puces en début de ligne
	.replace(/(^|\n|\r)--?/gu, function (match, p1) {
	  console.log("puces en début de ligne");
	  count++;
	  return "–";
	})
	//  n° --> №
	.replace(/n°/gu, function (match, p1, p2, p3) {
	  count++;
	  console.log("n°");
	  return "№";
	})
	// 1/2, 1/3, 1/4 --> caractères dédiés pour ces fractions
	.replace(/(\s|\w|^)1\/2(\s|\w|$)/gu, function (match, p1, p2) {
	  count++;
	  console.log("1/2");
	  return `${p1}½${p2}`;
	})
	.replace(/(\s|\w|^)1\/3(\s|\w|$)/gu, function (match, p1, p2) {
	  count++;
	  console.log("1/3");
	  return `${p1}⅓${p2}`;
	})
	.replace(/(\s|\w|^)1\/4(\s|\w|$)/gu, function (match, p1, p2) {
	  count++;
	  console.log("1/4");
	  return `${p1}¼${p2}`;
	})
	// 1er --> ordinal en exposant
	.replace(/\b1er?\b/gu, function (match, p1, p2) {
	  count++;
	  console.log("1er --> ordinal en exposant");
	  return `1ᵉʳ`;
	})
	//2e --> ordinal en exposant
	.replace(/(?!1\b)(\d+)e\b/gu, function (match, p1, p2) {
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
	.replace(/(\s|^)(«)( ?)(\w+)/gu, function (match, p1, p2, p3, p4) {
	  console.log("//après «");
	  count++;
	  return `${p1}${OPENING_QUOTE}${NBSP}${p4}`;
	})
	//avant »
	.replace(/(\w+[.?!]?)( ?)(»)(\s|[.,?!:]|$)/gu, function (match, p1, p2, p3, p4) {
	  console.log("//avant »");
	  count++;
	  return `${p1}${NBSP}${CLOSING_QUOTE}${p4}`;
	})
	//avant %
	.replace(/(\d+) ?\%/gu, function (match, p1, p2) {
	  console.log("//avant %");
	  count++;
	  return `${p1}${NBSP}%`;
	})
	//avant $£€
	.replace(/(\d+) ?([$£€])/gu, function (match, p1, p2, p3) {
	  console.log("/avant $£€");
	  count++;
	  return `${p1}${NBSP}${p2}`;
	});
  // .replace(/(\d{3})( |\D|$)/gu, function (match, p1, p2) {
  //     console.log('milliers')
  //     count++;
  //     return `${p1}${NNBSP}`;
  // })

  //  ESPACES INSÉCABLES
  string = string
	//espaces fines insécables avant ? ! ; :
	.replace(REGEX_NNBSP_DOUBLE_PUNCTUATION, function (match, p1, p2, p3, p4) {
	  console.log("espaces fines insécables avant ? ! ; :");
	  count++;
	  return `${p1}${NBSP}${p3}${p4}`;
	})
	//après «
	.replace(/(\s|^)(«)( ?)(\w+)/gu, function (match, p1, p2, p3, p4) {
	  console.log("//après «");
	  count++;
	  return `${p1}${OPENING_QUOTE}${NBSP}${p4}`;
	})
	//avant »
	.replace(/(\w+[.?!]?)( ?)(»)(\s|[.,?!:]|$)/gu, function (match, p1, p2, p3, p4) {
	  console.log("//avant »");
	  count++;
	  return `${p1}${NBSP}${CLOSING_QUOTE}${p4}`;
	})
	//avant %
	.replace(/(\d+) ?\%/gu, function (match, p1, p2) {
	  console.log("//avant %");
	  count++;
	  return `${p1}${NBSP}%`;
	})
	//avant $£€
	.replace(/(\d+) ?([$£€])/gu, function (match, p1, p2, p3) {
	  console.log("/avant $£€");
	  count++;
	  return `${p1}${NBSP}${p2}`;
	});
  // .replace(/(\d{3})( |\D|$)/gu, function (match, p1, p2) {
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
  let autoReplaceActivated = Settings.settingForKey("autoReplace");

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
		`${count} remplacement effectué en  ${duration}`,
		document
	  );
	}

	if (
	  Settings.settingForKey("USE_NNBSP") == true &&
	  RegExp(NNBSP).test(selection)
	) {
	  console.log("replaceWNBSPbyNNBSP n'a pas marché");
	}
	if (
	  Settings.settingForKey("USE_NNBSP") == false &&
	  RegExp(WNBSP).test(selection)
	) {
	  console.log("replaceNNBSPbyWNBSP n'a pas marché");
	}
  } else {
	throw new Error("unable to access selection");
  }
}
