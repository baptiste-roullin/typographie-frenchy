[Readme in English below](#Le-French-typography)

# Typographie frenchy

Ce plugin pour Sketch permet de respecter automatiquement les conventions typographiques françaises et d'ajouter un peu de vernis à vos interface.

<div align="center">
<img src="https://raw.githubusercontent.com/Saint-loup/typographie-frenchy/master/assets/Icon_ombre.png" />
</div>

## Installation

Télécharger [la dernière version](https://github.com/Saint-loup/french-typography/releases/latest) et ouvrir le fichier. On peut aussi utiliser des gestionnaires de paquets comme [Sketch Runner](https://sketchrunner.com/) or [Sketchpacks](https://www.sketchpacks.com/Saint-loup/french-typography).

Retours and et signalements sont les bienvenus. Compatible avec Sketch 50 et plus.

## Ce qu'il fait

Il replace certains charactères par le bon équivalent quand on désélectionne un calque de texte.

**Interaction avec Mac OS** – Il marche que les substitutions soient activées au niveau système (Préférences système > Clavier > onglet Texte) ou non. Il fait plus que Mac OS, qui utilise des espaces insécables uniquement pour les guillemets.

**Petit avertissement pour les espaces fines insécables** (\u202F) – C'est la convention de l'utiliser, mais il est désactivé par défaut à cause d'un bug dans Safari qui l'affiche comme une espace de largeur nulle. Par exemple si vous copiez-collez du texte dans Safari ou que vous utilisez Craft et la fonction Inspect dans Invision, vous obtiendrez des espaces invisibles. Également, certaines polices ne supportent pas cette espace (certaines dans Safari, certaines partout). Il y a donc un paramètre pour choisir entre espaces normales et fines. L'activer ou le désactiver insère la bonne espace dans les calques de texte dans le document en cours.

**Francophonie** – le plugin marche dans un contexte francophone, dans certains cas et avec des limites. Par exemple le Français Canadien semble plus proche de la ponctuation anglaise.

##### Substitutions de charactère

| Symbole                                         | Statut |
| ----------------------------------------------- | ------ |
| De " à «                                        | ✔️      |
| De double tiret (--) à tiret demi-quadratin (–) | ✔️      |
| Certaines fractions (½, ⅓, ¼ )                  | ✔️      |
| Suffixes ordinaux : de 2e à 2ᵉ                  | ✔️      |
| Points de suspension…                           | ✔️      |
| Apostrophe droite > apostrophe courbe           | ✔️      |
| De N° à №                                       | ✔️      |

##### Insertion d'espaces insécables

| Symbole                   | Statut |
| ------------------------- | ------ |
| :                         | ✔️      |
| «                         | ✔️      |
| »                         | ✔️      |
| !                         | ✔️      |
| ?                         | ✔️      |
| ;                         | ✔️      |
| %                         | ✔️      |
| Tiret demi-quadratin      | ✔️      |
| Monnaie :  $ €            | ✔️      |
| Centaines, milliers, etc. |        |

## Ce qu'il ne fait pas

- Insérer des espaces insécables dans des cas complexes (par ex. les latitudes), recensés [ici](https://www.btb.termiumplus.gc.ca/tpv2guides/guides/chroniq/index-fra.html?lang=fra&lettr=indx_autr8cDRJ-6fjpl0&page=9ouqyIer24Kc.html) ou [non](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Non-breaking_spaces).
- Accentuer les lettres capitales. Pas de moyen simple de distinguer entre SALE et SALÉ.
- Des choses mieux gérées par un balisage dédié. Par exemple, le support et l'affichage des [fractions et exposants](https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts#Superscripts_and_subscripts_block) en Unicode est très inégal.
- Des fautes telles que les doubles espaces.

## Tambouille technique

[Voir plus bas](#Boring-stuff)

_____________________________________________________________________
_____________________________________________________________________


# Le French typography

Sketch plugin to automatically add typographical French conventions and give a nice touch to UIs.

## Install

Download [the latest release](https://github.com/Saint-loup/french-typography/releases/latest) and open the file. You can also use package managers like [Sketch Runner](https://sketchrunner.com/) or [Sketchpacks](https://www.sketchpacks.com/Saint-loup/french-typography).

Feedbacks and bug reports are welcome.

## What it does

It replaces some characters with their proper equivalents when you deselect a text layer. 

**Interaction with Mac OS** – It works whether you enable smart substitutions at the system level (System preferences > Keyboard > Text tab) or not. It does more than Mac OS, which uses non-breakable spaces only for quotes.

**A word of caution about narrow non-breakables spaces** – Using this character (\u202F) is the convention, but it's disabled by default because of a bug in Safari which renders it as a zero-width space. For instance if you copy & paste the text into Safari or use Craft and the Inspect feature in Invision, you will end up with invisible spaces. Also, some typefaces don't support this space (some only in Sketch, some everywhere). That's why there's a setting to choose between normal or narrow spaces. Toggling it will also set the correct space for existing text layers in the current document. 

**French outside France** – The plugin *may* work in some francophone contexts, with various limits. For instance Canadian French seems closer to english punctuation.

##### Character substitutions

| Symbol                               | Status |
| ------------------------------------ | ------ |
| From " to «                          | ✔️      |
| From double dash (--) to en-dash (–) | ✔️      |
| Some fractions (½, ⅓, ¼ )            | ✔️      |
| Ordinal suffixes: from 2e to 2ᵉ      | ✔️      |
| Ellipsis…                            | ✔️      |
| From N° to №                         | ✔️      |

##### Insertion of non-breaking spaces

| Symbol                            | Status |
| --------------------------------- | ------ |
| :                                 | ✔️      |
| «                                 | ✔️      |
| »                                 | ✔️      |
| !                                 | ✔️      |
| ?                                 | ✔️      |
| ;                                 | ✔️      |
| %                                 | ✔️      |
| En-dash  (*tiret demi-quadratin*) | ✔️      |
| Currency:  $ €                    | ✔️      |
| Hundreds, thousands, etc.         |        |

## What it doesn't do

- Inserting non-breaking spaces in complex cases (eg. latitudes), listed [here](https://www.btb.termiumplus.gc.ca/tpv2guides/guides/chroniq/index-fra.html?lang=fra&lettr=indx_autr8cDRJ-6fjpl0&page=9ouqyIer24Kc.html) or [there](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Non-breaking_spaces).
- Accents on capital letters. There's no way to automatically tell SALE and SALÉ apart.
- Things that would be better handled with dedicated markup. For instance, support and rendering of [fractions and exposants](https://en.wikipedia.org/wiki/Unicode_subscripts_and_superscripts#Superscripts_and_subscripts_block) in Unicode is really spotty.
- Typos like double spaces.

## Boring stuff

##### Build from source

Follow instructions for SKPM, the Sketch plugin toolchain : [here](https://skpm.io/help/) and [there](https://developer.sketchapp.com/guides/)

##### Tests

To check for errors in regex, in the plugin folder run:

`npm test`

It's a shorcut for : 
build && <sketchTool path> run <plugin path> testRegex

##### Debuging

There's a little debug mode, enabled by placed a file named "debug" in the assets folder. It results in logs in the console and in Sketch, when using the plugin. 
