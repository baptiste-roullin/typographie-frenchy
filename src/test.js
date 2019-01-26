const sketch = require("sketch");
const Settings = require("sketch/settings");
const Diff = require("diff");	
const document = sketch.getSelectedDocument();
const {replaceString} = require("./command.js");
const {U} = require("./command.js");
const {settingsList} = require("./command.js");


function spaceInUnicode(str) {
	let newstring = str.replace(/(\u00A0|\u202F|\u0020)/g, function (match, p1) {
		return `${p1.charCodeAt().toString(16)}`;
	})
	return newstring
}

//fonction qui texte les regex : comparaison entre chaines après remplacement et chaines de référence
export function testRegex() {
U.NBSP = (Settings.settingForKey(settingsList.USE_NNBSP.ID) == true ? U.NNBSP : U.WNBSP );

const toFixString =
`"tester", «${U.NBSP}tester »! « tester » l'"histoire"?
l'«histoire..." . « tester ». Et pourtant... je suis`;

const referenceString =
`«${U.NBSP}tester${U.NBSP}», «${U.NBSP}tester${U.NBSP}»${U.NBSP}! «${U.NBSP}tester${U.NBSP}» l'«${U.NBSP}histoire${U.NBSP}»${U.NBSP}?
l'«${U.NBSP}histoire${U.ELLIPSIS}${U.NBSP}» . «${U.NBSP}tester${U.NBSP}». Et pourtant${U.ELLIPSIS} je suis`;


	const fixedString = replaceString(toFixString).string;
	if (fixedString == referenceString) {
		console.log('test : succès');
  } else {
		
		console.log("référence \t", spaceInUnicode(referenceString), "résultat \t", spaceInUnicode(fixedString), "origine \t",spaceInUnicode(toFixString));
		console.log("\n\n test : erreur \n",  Diff.diffChars(fixedString, referenceString));
  }
}