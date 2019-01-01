# Le french typography

*****
## Work In Progress. Not Ready For Production Purposes. Or Testing Purposes. Or Any Kind Of Purposes Really. Stay Tuned. 
*****

Sketch plugin to automatically add typographical french conventions and give a nice touch to UIs. Like the oh so important thinner spaces.


## Ce que ça fait

### Général 

Paramètres pour 
* désactiver le remplacement automatique
* choisir entre espace normale insécable et espace fine insécable. Utile, puisqu'un bug de Safari affiche ces dernières comme des espaces de largeur nulle (oui, ça existe en Unicode), ce qui peut être gênant si on veut exporter le texte (à la main ou depuis Invision dans l'onglet Inspect).

### Insertion d'espaces insécables

| Symbole               | Statut |
| --------------------- | ------- |
| :                     |    ✔️   |
| «                     |    ✔️   |
| »                     |    ✔️ ️  |
| !                     |    ✔️   |
| ?                     |    ✔️   |
| ;                     |    ✔️   |
| %                     |    ✔️   |
| Tirets d'incise       |         |
| Monnaie :  $ €        |     ✔️    |
| Espaces entre centaines, milliers...              |         |



### Remplacement de caractères

| Symbole                      | Statut |
| ---------------------------- | ------ |
| Tirets demi-quadratins       |  ✔️    |
| Certaines fractions (½, ⅓, ¼ ) | ✔️   |
| Suffixes ordinaux (1er, 2e...)|  ✔️️   |
| Points de suspension (…) :   |   ✔️   |
| N° ==> №                     |    ✔️️️  |
| Guillemets hauts => guillemets bas<br />(pour l'instant on suppose que le paramètre système correspondant est activé                       |        |

## Ce que ça ne fait pas

Ce plugin n'a pas vocation à traiter les cas suivants :

* Des insertions d'espaces insécables dans des cas plus complexes (latitudes, groupes comprenant mot et chiffre, etc.), répertoriés [[ici]](https://www.btb.termiumplus.gc.ca/tpv2guides/guides/chroniq/index-fra.html?lang=fra&lettr=indx_autr8cDRJ-6fjpl0&page=9ouqyIer24Kc.html) ou [[là]](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Non-breaking_spaces).
* L'accentuation des lettres capitales (pas de moyen simple pour déterminer si l'utilisateur veut dire SALE ou SALÉ).
* Les choses dont le rendu et le support sont complexes et imparfaits en unicode et beaucoup mieux traités avec un balisage HTML ou spécialisé. Exemple : la gestion des [fractions et exposants].(https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts#Superscripts_and_subscripts_block).
* Les erreurs genre double espace.


## build from source
Follow SKPM instructions : [1](https://skpm.io/help/) and [2](https://developer.sketchapp.com/guides/)

## tests

To check for errors in regex, in the plugin folder run :

`npm test`

It's a shorcut for : 
build && [sketchTool path] run [plugin path] testRegex