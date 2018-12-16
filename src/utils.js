// traversal of the document module by https://github.com/thierryc/Sketch-Find-And-Replace
// Translated from SketchScript to JS.

let textLayers = [];
export function searchInLayer(layer, inSymbolMaster) {
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
