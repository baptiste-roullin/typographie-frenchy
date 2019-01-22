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

const sketch = require("sketch");
const Settings = require("sketch/settings");
const searchAllTextLayers = require("./utils.js");
const document = sketch.getSelectedDocument();


// LABELS
const LABEL_POPIN_TITLE = "French typography settings";
const LABEL_AUTO_REPLACE = " Automatic substitutions";
const LABEL_USE_NNBSP = " Enable narrow non-breakable spaces \n Resulting text is not compatible with Safari";


// CHARACTER CONSTANTS
export const U =  {
ELLIPSIS : "\u2026",
SPACE : "\u0020",		// Good ol' space
WNBSP : "\u00A0",   // wide non breakable space
NNBSP : "\u202F",   // narrow non breakable space
OPENING_QUOTE : "«",
CLOSING_QUOTE : "»"

}
// REGEXs
const NBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)(\s?)([?!;:])(\s|$)/gu;
const REGEX_ELLIPSIS 					= /(\.{2,5})|(\. \. \.)/gu;
const DOUBLE_QUOTE_OPEN    		= /("(?=\w))|((?:\s|\^)"(?=\S))/gu;
const DOUBLE_QUOTE_CLOSE    	= /(?:(\w)")|(?:(\S)"(?=\s|$))/gu;
const NBSP_AFTER_QUOTE 				= /(\s|^|\'|\‘|\’)(«)(\s?)(\w+)/gu; 
const NBSP_BEFORE_QUOTE 			= /(?:(\w)»)|(?:(\S)»(?=\s|$))|(?:(\w|\s)»)/gu ;
const ANY_NUMBER_EXCEPT_ONE 	= /(?!1\b)d+/gu; 

// SETTINGS


const settingsList = {
  AUTO_REPLACE : {
		ID : "AUTO_REPLACE",
		label : LABEL_AUTO_REPLACE
  },
	USE_NNBSP : {
		ID : "USE_NNBSP",
		label : LABEL_USE_NNBSP
  }
}

export function initPlugin(context) {

	try {
		if (NSFileManager.defaultManager().fileExistsAtPath( context.plugin.urlForResourceNamed("debug").path()) == 1) {
			Settings.setSettingForKey(settingsList.DEBUG, true);
		}
		else {
			Settings.setSettingForKey(settingsList.DEBUG, false);
		}
		}
	catch(error) {
		console.error(error);
	}


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
	let newText = layer.text.replace(RegExp(U.NNBSP, 'gu'), U.WNBSP);
	layer.text = newText;
  });
}

export function replaceWNBSPbyNNBSP(context) {
  let textLayers = searchAllTextLayers.searchInLayer(document, true);
  textLayers.forEach(function (layer) {
	let newText = layer.text.replace(RegExp(U.WNBSP, 'gu'), U.NNBSP);
	layer.text = newText;
  });
}


export function createCheckbox(setting, frame) {
	let checkbox = NSButton.alloc().initWithFrame(frame);
	checkbox.setButtonType(NSSwitchButton);
	checkbox.setBezelStyle(0);
	checkbox.setTitle(setting.label);

	if (Settings.settingForKey(setting.ID)) {
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
  dialogWindow.setMessageText(LABEL_POPIN_TITLE);
  
  let checkboxAutoReplace = 	createCheckbox(settingsList.AUTO_REPLACE, NSMakeRect(0, 0, 250, 23) );
  let checkboxUseNNBSP = 			createCheckbox(settingsList.USE_NNBSP, NSMakeRect(25, 0, 300, 56) );
  dialogWindow.addAccessoryView(checkboxAutoReplace);
  dialogWindow.addAccessoryView(checkboxUseNNBSP);

	// labels seem hardcoded: shortcuts like ESC don't seem to work with any other labels.
  dialogWindow.addButtonWithTitle("OK");
  dialogWindow.addButtonWithTitle("Cancel");

  let response = dialogWindow.runModal()
	if (response == "1000"){ 
		saveSettings(settingsList.AUTO_REPLACE, checkboxAutoReplace );
		saveSettings(settingsList.USE_NNBSP, checkboxUseNNBSP);

		if (Settings.settingForKey(settingsList.USE_NNBSP.ID) ) {
		U.NBSP = U.NNBSP;	
		replaceWNBSPbyNNBSP();
		} else {
		U.NBSP = U.WNBSP;	
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
//On vérifie le charactère choisi par l'utilisateur comme espace et on l'affecte
U.NBSP = (Settings.settingForKey(settingsList.USE_NNBSP.ID) == true ? U.NNBSP : U.WNBSP );

string = string.replace(

									 // REMPLACEMENTS
  
				 
	// points de suspension

		REGEX_ELLIPSIS, (match) => {
			console.log("points de suspension");
			count++;
			return U.ELLIPSIS;		
		}).	

		//incises intelligentes
		replace(/([^0-9]\s)--?(\s?[^0-9])/, ( match, $1, $2, $3) => {
			console.log("incises intelligentes");
			count++;
			return `${$1}–${$1}`;
		}).

		// puces en début de ligne
		replace(/(^|\n|\r)--?/, (match, $1) => {
			console.log("puces en début de ligne");
			count++;
			return "–";
		}).

		//  n° --> №
		replace(/n°/, (match, $1, $2, $3) => {
			count++;
			console.log("n°");
			return "№";
		}).

		// 1/2, 1/3, 1/4 --> caractères dédiés pour ces fractions
		replace(/(\s|\w|^)1\/2(\s|\w|$)/, ( match, $1, $2) => {
			count++;
			console.log("1/2");
			return `${$1}½${$2}`;
		}).

		replace(/(\s|\w|^)1\/3(\s|\w|$)/, ( match, $1, $2) => {
			count++;
			console.log("1/3");
			return `${$1}⅓${$2}`;
		}).

		replace(/(\s|\w|^)1\/4(\s|\w|$)/, ( match, $1, $2) => {
			count++;
			console.log("1/4");
			return `${$1}¼${$2}`;
		}).

		// 1er --> ordinal en exposant
		replace(/\b1er?\b/, ( match, $1, $2) => {
			count++;
			console.log("1er --> ordinal en exposant");
			return `1ᵉʳ`;
		}).

		//2e --> ordinal en exposant
		replace(/(?!1\b)(\d+)e\b/, ( match, $1, $2) => {
			count++;
			console.log("2e --> ordinal en exposant");
			return `${$1}ᵉ`;
		}).


//  ESPACES INSÉCABLES
	

		// remplace " par «
		replace(DOUBLE_QUOTE_OPEN,( match, $1, $2) => {
			count++
			
			let adj =  $2 || "";
			//console.log(adj)
			return U.OPENING_QUOTE + adj;
		}).

		//remplace " par »
		replace(DOUBLE_QUOTE_CLOSE,( match, $1, $2) => {
			count++
			let adj = $1 || $2 || "";
			return adj + U.CLOSING_QUOTE;
		}).

		//ajoute espace après «
		replace(NBSP_AFTER_QUOTE, ( match, $1, $2, $3, $4) => {
			console.log("//après «");
			count++;
			return  $1 + $2 + U.NBSP + $4;;
		}).

		//espaces fines insécables avant ? ! ; :
		replace(NBSP_DOUBLE_PUNCTUATION, ( match, $1, $2, $3, $4) => {
			console.log("espaces fines insécables avant ? ! ; :");
			count++;
			return $1 + U.NBSP + $3 + $4;
		}).

		//ajoute espace avant »
		replace(NBSP_BEFORE_QUOTE, ( match, $1, $2) => {
			console.log("//avant »");
			count++;
			let adj = $1 || $2 || "";
			console.log("adj : ", adj);
			return adj +  U.NBSP + U.CLOSING_QUOTE ;
		}).

		//avant %
		replace(/(\d+)\s?\%/, ( match, $1, $2) => {
			console.log("//avant %");
			count++;
			return `${$1}${U.NBSP}%`;
		}).

		//avant $£€
		replace(/(\d+)\s?([$£€])/, ( match, $1, $2, $3) => {
			console.log("/avant $£€");
			count++;
			return `${$1}${U.NBSP}${$2}`;
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
export function fixLayer(context) {

  // Si le remplacement automatique est désactivé dans les paramètres, on quitte la fonction
  let autoReplaceActivated = Settings.settingForKey(settingsList.AUTO_REPLACE.ID);

  if (!autoReplaceActivated) {
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
	if (	count > 0 &&	Settings.settingForKey(settingsList.DEBUG)	) {
	  sketch.UI.message(`${count} substitution(s) done in ${duration}`,document	  );
	}

	if (	  Settings.settingForKey(settingsList.USE_NNBSP.ID) &&  RegExp(U.NNBSP).test(selection)	) {
	  console.log("replaceWNBSPbyNNBSP n'a pas marché");
	}
	if (	  !Settings.settingForKey(settingsList.USE_NNBSP.ID) &&	  RegExp(U.WNBSP).test(selection)	) {
	  console.log("replaceNNBSPbyWNBSP n'a pas marché");
	}
  } else {
	throw new Error("unable to access selection");
  }
}
