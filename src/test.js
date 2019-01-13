const sketch = require("sketch");
const Settings = require("sketch/settings");
const Diff = require("diff");	
const document = sketch.getSelectedDocument();
const replaceString = require("./command.js").replaceString;
const U = require("./command.js").U;


function spaceInUnicode(str) {
	let newstring = str.replace(/(\u00A0|\u202F|\u0020)/g, function (match, p1) {
		return `${p1.charCodeAt().toString(16)}`;
	})
	return newstring
}

//fonction qui texte les regex : comparaison entre chaines après remplacement et chaines de référence
export function testRegex() {

const toFixString =
`"tester", «${U.NBSP}tester »! « tester » l'"histoire"?
l'«histoire..." . « tester ».`;

const referenceString =
`«${U.NBSP}tester${U.NBSP}», «${U.NBSP}tester${U.NBSP}»${U.NBSP}! «${U.NBSP}tester${U.NBSP}» l'«${U.NBSP}histoire${U.NBSP}»${U.NBSP}?
l'«${U.NBSP}histoire${U.ELLIPSIS}${U.NBSP}» . «${U.NBSP}tester${U.NBSP}».`;


	const fixedString = replaceString(toFixString).string;
	if (fixedString == referenceString) {
		console.log('test : succès');
  } else {
		
		console.log("référence \t", spaceInUnicode(referenceString), "résultat \t", spaceInUnicode(fixedString), "origine \t",spaceInUnicode(toFixString));
		console.log("\n\n test : erreur \n",  Diff.diffChars(fixedString, referenceString));
  }
}