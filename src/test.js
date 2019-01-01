const sketch = require("sketch");
const Settings = require("sketch/settings");
const Diff = require("diff");
const document = sketch.getSelectedDocument();
const replaceString = require("./command.js").replaceString;


function spaceInUnicode(str) {
	let newstring = str.replace(/(\u00A0|\u202F)/, function (match, p1) {
		return `${p1.charCodeAt().toString(16)}`;
	})
	return newstring
}

//fonction qui texte les regex : comparaison entre chaines après remplacement et chaines de référence


let referenceString =""
let toFixString =""

export function testRegex(referenceString, toFixString) { 
	result = replaceString(toFixString).string;
	if  ( result == referenceString) {
		console.log('Test success : ', result)
		return 	result
	}
	else {
		console.log("\n\n test error : \n",  Diff.diffChars(fixedString, referenceString));		
		return;
	}
}

testRegex(referenceString, "toFixString").
testRegex()


//   if (fixedString == referenceString) {
// 		console.log('test : succès');
//   } else {
		
// 		console.log("référence \t", spaceInUnicode(referenceString), "résultat \t", spaceInUnicode(fixedString), "origine \t",spaceInUnicode(toFixString));
// 		console.log("\n\n test : erreur \n",  Diff.diffChars(fixedString, referenceString));
//   }
// }