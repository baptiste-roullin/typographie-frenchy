var that=this;function __skpm_run(e,n){that.context=n;var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n,t){(function(n){function t(e,t){var i=Array.prototype.slice.call(t);i.forEach(function(e){try{log(n._skpmPrefix+function(){for(var e="",n=0;n<r;n++)e+="  ";r>0&&(e+="| ");return e}()+e)}catch(n){log(e)}})}n._skpmPrefix="console> ";var r=0;var i=n.group;n.group=function(){i&&i.apply(this,arguments),r+=1};var o=n.groupCollapsed;n.groupCollapsed=function(){o&&o.apply(this,arguments),r+=1};var u=n.groupEnd;n.groupEnd=function(){u&&u.apply(this,arguments),(r-=1)<0&&(r=0)};var s={},a=n.count;n.count=function(e){return s[e=void 0!==e?e:"Global"]=(s[e]||0)+1,a&&a.apply(this,arguments),t(0,[e+": "+s[e]])};var l={},f=n.time;n.time=function(e){if(f&&f.apply(this,arguments),l[e=void 0!==e?e:"default"])return t(0,['Timer "'+e+'" already exists']);l[e]=Date.now()};var c=n.timeEnd;n.timeEnd=function(e){if(c&&c.apply(this,arguments),!l[e=void 0!==e?e:"default"])return t(0,['Timer "'+e+'" does not exist']);var n=Date.now()-l[e];return delete l[e],t(0,[e+": "+n/1e3+"ms"])};var d=n.log;n.log=function(){return d&&d.apply(this,arguments),t(0,arguments)};var p=n.warn;n.warn=function(){return p&&p.apply(this,arguments),t(0,arguments)};var h=n.error;n.error=function(){return h&&h.apply(this,arguments),t(0,arguments)};var g=n.assert;n.assert=function(e,n){if(g&&g.apply(this,arguments),!e)return t(0,[n])};var v=n.info;n.info=function(){return v&&v.apply(this,arguments),t(0,arguments)};var F=n.clear;n.clear=function(){F&&F()},n._skpmEnabled=!0,e.exports=n}).call(n,t(0))},function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.initPlugin=function(n){try{1==NSFileManager.defaultManager().fileExistsAtPath(n.plugin.urlForResourceNamed("debug").path())&&(i.setSettingForKey(g.DEBUG.ID,!0),e.log("debug mode : "+i.settingForKey(g.DEBUG.ID)))}catch(n){e.log("debug mode : "+i.settingForKey(g.DEBUG.ID)),i.setSettingForKey(g.DEBUG.ID,!1)}void 0==i.settingForKey(g.AUTO_REPLACE.ID)&&(e.log("test d'undef passé"),i.setSettingForKey(g.AUTO_REPLACE.ID,!0));void 0==i.settingForKey(g.USE_NNBSP.ID)&&i.setSettingForKey(g.USE_NNBSP.ID,!1)},n.replaceNNBSPbyWNBSP=v,n.replaceWNBSPbyNNBSP=F,n.createCheckbox=S,n.saveSettings=m,n.openSettings=function(e){var n=COSAlertWindow.alloc().init(),t=e.plugin.urlForResourceNamed("icon.png").path();n.setIcon(NSImage.alloc().initByReferencingFile(t)),n.setMessageText(s);var r=S(g.AUTO_REPLACE,NSMakeRect(0,0,250,23)),o=S(g.USE_NNBSP,NSMakeRect(25,0,300,56));return n.addAccessoryView(r),n.addAccessoryView(o),n.addButtonWithTitle("OK"),n.addButtonWithTitle("Cancel"),"1000"==n.runModal()?(m(g.AUTO_REPLACE,r),m(g.USE_NNBSP,o),void(i.settingForKey(g.USE_NNBSP.ID)?(a.NBSP=a.NNBSP,F()):(a.NBSP=a.WNBSP,v()))):void 0},n.replaceString=y,n.fixLayer=function(n){if(!i.settingForKey(g.AUTO_REPLACE.ID))return;if(!n.actionContext.old)throw new Error("unable to access selection");var t=new Date,o=r.fromNative(n.actionContext.layer),s=y(o.text);o.text=s.string;var l=s.count,f=new Date,c=(f.getTime()-t.getTime())/1e3;l>0&&i.settingForKey(g.DEBUG.ID)&&r.UI.message(String(l)+" substitution(s) done in "+c,u),i.settingForKey(g.USE_NNBSP.ID)&&RegExp(a.NNBSP).test(o)&&e.log("replaceWNBSPbyNNBSP n'a pas marché"),!i.settingForKey(g.USE_NNBSP.ID)&&RegExp(a.WNBSP).test(o)&&e.log("replaceNNBSPbyWNBSP n'a pas marché")};var r=t(2),i=t(3),o=t(8),u=r.getSelectedDocument(),s="French typography settings",a=n.U={ELLIPSIS:"…",SPACE:" ",WNBSP:" ",NNBSP:" ",OPENING_QUOTE:"«",CLOSING_QUOTE:"»"},l=/([0-9A-Z_a-z]+(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?\xBB)?)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)([!:;\?])([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$)/g,f=/(\.{2,5})|(\. \. \.)/g,c=/("(?=[0-9A-Z_a-z]))|((?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|\^)"(?=(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])))/g,d=/(?:([0-9A-Z_a-z])")|(?:((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))"(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$))/g,p=/([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|^|'|\u2018|\u2019)(\xAB)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)([0-9A-Z_a-z]+)/g,h=/(?:([0-9A-Z_a-z])\xBB)|(?:((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))\xBB(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|$))|(?:([0-9A-Z_a-z]|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])\xBB)/g,g=n.settingsList={AUTO_REPLACE:{ID:"AUTO_REPLACE",label:" Automatic substitutions"},USE_NNBSP:{ID:"USE_NNBSP",label:" Narrow non-breakable spaces \n Resulting text is not compatible with Safari"},DEBUG:{ID:"DEBUG"}};function v(e){o.searchInLayer(u,!0).forEach(function(e){var n=e.text.replace(RegExp(a.NNBSP,"gu"),a.WNBSP);e.text=n})}function F(e){o.searchInLayer(u,!0).forEach(function(e){var n=e.text.replace(RegExp(a.WNBSP,"gu"),a.NNBSP);e.text=n})}function S(e,n){var t=NSButton.alloc().initWithFrame(n);return t.setButtonType(NSSwitchButton),t.setBezelStyle(0),t.setTitle(e.label),i.settingForKey(e.ID)?t.setState(NSOnState):t.setState(NSOffState),t}function m(e,n){e.state=1==n.state(),i.setSettingForKey(e.ID,e.state)}function y(n){var t=0;return a.NBSP=1==i.settingForKey(g.USE_NNBSP.ID)?a.NNBSP:a.WNBSP,{string:n=n.replace(f,function(n){return e.log("points de suspension"),t++,a.ELLIPSIS}).replace(/([^0-9]\s)--?(\s?[^0-9])/,function(n,r,i,o){return e.log("incises intelligentes"),t++,String(r)+"–"+String(r)}).replace(/(^|\n|\r)--?/,function(n,r){return e.log("puces en début de ligne"),t++,"–"}).replace(/n°/,function(n,r,i,o){return t++,e.log("n°"),"№"}).replace(/(\s|\w|^)1\/2(\s|\w|$)/,function(n,r,i){return t++,e.log("1/2"),String(r)+"½"+String(i)}).replace(/(\s|\w|^)1\/3(\s|\w|$)/,function(n,r,i){return t++,e.log("1/3"),String(r)+"⅓"+String(i)}).replace(/(\s|\w|^)1\/4(\s|\w|$)/,function(n,r,i){return t++,e.log("1/4"),String(r)+"¼"+String(i)}).replace(/\b1er?\b/,function(n,r,i){return t++,e.log("1er --\x3e ordinal en exposant"),"1ᵉʳ"}).replace(/(?!1\b)(\d+)e\b/,function(n,r,i){return t++,e.log("2e --\x3e ordinal en exposant"),String(r)+"ᵉ"}).replace(c,function(e,n,r){t++;var i=r||"";return a.OPENING_QUOTE+i}).replace(d,function(e,n,r){return t++,(n||r||"")+a.CLOSING_QUOTE}).replace(p,function(n,r,i,o,u){return e.log("//après «"),t++,r+i+a.NBSP+u}).replace(l,function(n,r,i,o,u){return e.log("espaces fines insécables avant ? ! ; :"),t++,r+a.NBSP+o+u}).replace(h,function(n,r,i){e.log("//avant »"),t++;var o=r||i||"";return e.log("adj : ",o),o+a.NBSP+a.CLOSING_QUOTE}).replace(/(\d+)\s?\%/,function(n,r,i){return e.log("//avant %"),t++,""+String(r)+String(a.NBSP)+"%"}).replace(/(\d+)\s?([$£€])/,function(n,r,i,o){return e.log("/avant $£€"),t++,""+String(r)+String(a.NBSP)+String(i)}),count:t}}}).call(n,t(0))},function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.testRegex=function(){s.NBSP=1==i.settingForKey(a.USE_NNBSP.ID)?s.NNBSP:s.WNBSP;var n='"tester", «'+String(s.NBSP)+'tester »! « tester » l\'"histoire"?\nl\'«histoire..." . « tester ». Et pourtant... je suis',t="«"+String(s.NBSP)+"tester"+String(s.NBSP)+"», «"+String(s.NBSP)+"tester"+String(s.NBSP)+"»"+String(s.NBSP)+"! «"+String(s.NBSP)+"tester"+String(s.NBSP)+"» l'«"+String(s.NBSP)+"histoire"+String(s.NBSP)+"»"+String(s.NBSP)+"?\nl'«"+String(s.NBSP)+"histoire"+String(s.ELLIPSIS)+String(s.NBSP)+"» . «"+String(s.NBSP)+"tester"+String(s.NBSP)+"». Et pourtant"+String(s.ELLIPSIS)+" je suis",r=u(n).string;r==t?e.log("test : succès"):(e.log("référence \t",l(t),"résultat \t",l(r),"origine \t",l(n)),e.log("\n\n test : erreur \n",o.diffChars(r,t)))};var r=t(2),i=t(3),o=t(5),u=(r.getSelectedDocument(),t(1).replaceString),s=t(1).U,a=t(1).settingsList;function l(e){return e.replace(/(\u00A0|\u202F|\u0020)/g,function(e,n){return""+String(n.charCodeAt().toString(16))})}}).call(n,t(0))},function(e,n,t){(function(n){
/*!

 diff v3.5.0

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
!function(n,t){e.exports=t()}(0,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}return t.m=e,t.c=n,t.p="",t(0)}([function(e,n,t){"use strict";n.__esModule=!0,n.canonicalize=n.convertChangesToXML=n.convertChangesToDMP=n.merge=n.parsePatch=n.applyPatches=n.applyPatch=n.createPatch=n.createTwoFilesPatch=n.structuredPatch=n.diffArrays=n.diffJson=n.diffCss=n.diffSentences=n.diffTrimmedLines=n.diffLines=n.diffWordsWithSpace=n.diffWords=n.diffChars=n.Diff=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1)),i=t(2),o=t(3),u=t(5),s=t(6),a=t(7),l=t(8),f=t(9),c=t(10),d=t(11),p=t(13),h=t(14),g=t(16),v=t(17);n.Diff=r.default,n.diffChars=i.diffChars,n.diffWords=o.diffWords,n.diffWordsWithSpace=o.diffWordsWithSpace,n.diffLines=u.diffLines,n.diffTrimmedLines=u.diffTrimmedLines,n.diffSentences=s.diffSentences,n.diffCss=a.diffCss,n.diffJson=l.diffJson,n.diffArrays=f.diffArrays,n.structuredPatch=h.structuredPatch,n.createTwoFilesPatch=h.createTwoFilesPatch,n.createPatch=h.createPatch,n.applyPatch=c.applyPatch,n.applyPatches=c.applyPatches,n.parsePatch=d.parsePatch,n.merge=p.merge,n.convertChangesToDMP=g.convertChangesToDMP,n.convertChangesToXML=v.convertChangesToXML,n.canonicalize=l.canonicalize},function(e,t){"use strict";function r(){}function i(e,n,t,r,i){for(var o=0,u=n.length,s=0,a=0;o<u;o++){var l=n[o];if(l.removed){if(l.value=e.join(r.slice(a,a+l.count)),a+=l.count,o&&n[o-1].added){var f=n[o-1];n[o-1]=n[o],n[o]=f}}else{if(!l.added&&i){var c=t.slice(s,s+l.count);c=c.map(function(e,n){var t=r[a+n];return t.length>e.length?t:e}),l.value=e.join(c)}else l.value=e.join(t.slice(s,s+l.count));s+=l.count,l.added||(a+=l.count)}}var d=n[u-1];return u>1&&"string"==typeof d.value&&(d.added||d.removed)&&e.equals("",d.value)&&(n[u-2].value+=d.value,n.pop()),n}function o(e){return{newPos:e.newPos,components:e.components.slice(0)}}t.__esModule=!0,t.default=r,r.prototype={diff:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},u=r.callback;"function"==typeof r&&(u=r,r={}),this.options=r;var s=this;function a(e){return u?(n(function(){u(void 0,e)},0),!0):e}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e));var l=(t=this.removeEmpty(this.tokenize(t))).length,f=e.length,c=1,d=l+f,p=[{newPos:-1,components:[]}],h=this.extractCommon(p[0],t,e,0);if(p[0].newPos+1>=l&&h+1>=f)return a([{value:this.join(t),count:t.length}]);function g(){for(var n=-1*c;n<=c;n+=2){var r=void 0,u=p[n-1],d=p[n+1],h=(d?d.newPos:0)-n;u&&(p[n-1]=void 0);var g=u&&u.newPos+1<l,v=d&&0<=h&&h<f;if(g||v){if(!g||v&&u.newPos<d.newPos?(r=o(d),s.pushComponent(r.components,void 0,!0)):((r=u).newPos++,s.pushComponent(r.components,!0,void 0)),h=s.extractCommon(r,t,e,n),r.newPos+1>=l&&h+1>=f)return a(i(s,r.components,t,e,s.useLongestToken));p[n]=r}else p[n]=void 0}c++}if(u)!function e(){n(function(){if(c>d)return u();g()||e()},0)}();else for(;c<=d;){var v=g();if(v)return v}},pushComponent:function(e,n,t){var r=e[e.length-1];r&&r.added===n&&r.removed===t?e[e.length-1]={count:r.count+1,added:n,removed:t}:e.push({count:1,added:n,removed:t})},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,u=e.newPos,s=u-r,a=0;u+1<i&&s+1<o&&this.equals(n[u+1],t[s+1]);)u++,s++,a++;return a&&e.components.push({count:a}),e.newPos=u,s},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}}},function(e,n,t){"use strict";n.__esModule=!0,n.characterDiff=void 0,n.diffChars=function(e,n,t){return i.diff(e,n,t)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1));var i=n.characterDiff=new r.default},function(e,n,t){"use strict";n.__esModule=!0,n.wordDiff=void 0,n.diffWords=function(e,n,t){return t=(0,i.generateOptions)(t,{ignoreWhitespace:!0}),s.diff(e,n,t)},n.diffWordsWithSpace=function(e,n,t){return s.diff(e,n,t)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1)),i=t(4);var o=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,u=/\S/,s=n.wordDiff=new r.default;s.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!u.test(e)&&!u.test(n)},s.tokenize=function(e){for(var n=e.split(/(\s+|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&o.test(n[t])&&o.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n}},function(e,n){"use strict";n.__esModule=!0,n.generateOptions=function(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}},function(e,n,t){"use strict";n.__esModule=!0,n.lineDiff=void 0,n.diffLines=function(e,n,t){return o.diff(e,n,t)},n.diffTrimmedLines=function(e,n,t){var r=(0,i.generateOptions)(t,{ignoreWhitespace:!0});return o.diff(e,n,r)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1)),i=t(4);var o=n.lineDiff=new r.default;o.tokenize=function(e){var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n}},function(e,n,t){"use strict";n.__esModule=!0,n.sentenceDiff=void 0,n.diffSentences=function(e,n,t){return i.diff(e,n,t)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1));var i=n.sentenceDiff=new r.default;i.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)}},function(e,n,t){"use strict";n.__esModule=!0,n.cssDiff=void 0,n.diffCss=function(e,n,t){return i.diff(e,n,t)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1));var i=n.cssDiff=new r.default;i.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)}},function(e,n,t){"use strict";n.__esModule=!0,n.jsonDiff=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n.diffJson=function(e,n,t){return s.diff(e,n,t)},n.canonicalize=a;var i=function(e){return e&&e.__esModule?e:{default:e}}(t(1)),o=t(5);var u=Object.prototype.toString,s=n.jsonDiff=new i.default;function a(e,n,t,i,o){n=n||[],t=t||[],i&&(e=i(o,e));var s=void 0;for(s=0;s<n.length;s+=1)if(n[s]===e)return t[s];var l=void 0;if("[object Array]"===u.call(e)){for(n.push(e),l=new Array(e.length),t.push(l),s=0;s<e.length;s+=1)l[s]=a(e[s],n,t,i,o);return n.pop(),t.pop(),l}if(e&&e.toJSON&&(e=e.toJSON()),"object"===(void 0===e?"undefined":r(e))&&null!==e){n.push(e),l={},t.push(l);var f=[],c=void 0;for(c in e)e.hasOwnProperty(c)&&f.push(c);for(f.sort(),s=0;s<f.length;s+=1)l[c=f[s]]=a(e[c],n,t,i,c);n.pop(),t.pop()}else l=e;return l}s.useLongestToken=!0,s.tokenize=o.lineDiff.tokenize,s.castInput=function(e){var n=this.options,t=n.undefinedReplacement,r=n.stringifyReplacer,i=void 0===r?function(e,n){return void 0===n?t:n}:r;return"string"==typeof e?e:JSON.stringify(a(e,null,null,i),i,"  ")},s.equals=function(e,n){return i.default.prototype.equals.call(s,e.replace(/,([\r\n])/g,"$1"),n.replace(/,([\r\n])/g,"$1"))}},function(e,n,t){"use strict";n.__esModule=!0,n.arrayDiff=void 0,n.diffArrays=function(e,n,t){return i.diff(e,n,t)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(1));var i=n.arrayDiff=new r.default;i.tokenize=function(e){return e.slice()},i.join=i.removeEmpty=function(e){return e}},function(e,n,t){"use strict";n.__esModule=!0,n.applyPatch=o,n.applyPatches=function(e,n){"string"==typeof e&&(e=(0,r.parsePatch)(e));var t=0;!function r(){var i=e[t++];if(!i)return n.complete();n.loadFile(i,function(e,t){if(e)return n.complete(e);var u=o(t,i,n);n.patched(i,u,function(e){if(e)return n.complete(e);r()})})}()};var r=t(11),i=function(e){return e&&e.__esModule?e:{default:e}}(t(12));function o(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n&&(n=(0,r.parsePatch)(n)),Array.isArray(n)){if(n.length>1)throw new Error("applyPatch only works with a single input.");n=n[0]}var o=e.split(/\r\n|[\n\v\f\r\x85]/),u=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],s=n.hunks,a=t.compareLine||function(e,n,t,r){return n===r},l=0,f=t.fuzzFactor||0,c=0,d=0,p=void 0,h=void 0;function g(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],i=r.length>0?r[0]:" ",u=r.length>0?r.substr(1):r;if(" "===i||"-"===i){if(!a(n+1,o[n],i,u)&&++l>f)return!1;n++}}return!0}for(var v=0;v<s.length;v++){for(var F=s[v],S=o.length-F.oldLines,m=0,y=d+F.oldStart-1,N=(0,i.default)(y,c,S);void 0!==m;m=N())if(g(F,y+m)){F.offset=d+=m;break}if(void 0===m)return!1;c=F.offset+F.oldStart+F.oldLines}for(var P=0,x=0;x<s.length;x++){var w=s[x],_=w.oldStart+w.offset+P-1;P+=w.newLines-w.oldLines,_<0&&(_=0);for(var E=0;E<w.lines.length;E++){var D=w.lines[E],B=D.length>0?D[0]:" ",L=D.length>0?D.substr(1):D,A=w.linedelimiters[E];if(" "===B)_++;else if("-"===B)o.splice(_,1),u.splice(_,1);else if("+"===B)o.splice(_,0,L),u.splice(_,0,A),_++;else if("\\"===B){var b=w.lines[E-1]?w.lines[E-1][0]:null;"+"===b?p=!0:"-"===b&&(h=!0)}}}if(p)for(;!o[o.length-1];)o.pop(),u.pop();else h&&(o.push(""),u.push("\n"));for(var C=0;C<o.length-1;C++)o[C]=o[C]+u[C];return o.join("")}},function(e,n){"use strict";n.__esModule=!0,n.parsePatch=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.split(/\r\n|[\n\v\f\r\x85]/),r=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],i=[],o=0;function u(){var e={};for(i.push(e);o<t.length;){var r=t[o];if(/^(\-\-\-|\+\+\+|@@)\s/.test(r))break;var u=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(r);u&&(e.index=u[1]),o++}for(s(e),s(e),e.hunks=[];o<t.length;){var l=t[o];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(l))break;if(/^@@/.test(l))e.hunks.push(a());else{if(l&&n.strict)throw new Error("Unknown line "+(o+1)+" "+JSON.stringify(l));o++}}}function s(e){var n=/^(---|\+\+\+)\s+(.*)$/.exec(t[o]);if(n){var r="---"===n[1]?"old":"new",i=n[2].split("\t",2),u=i[0].replace(/\\\\/g,"\\");/^".*"$/.test(u)&&(u=u.substr(1,u.length-2)),e[r+"FileName"]=u,e[r+"Header"]=(i[1]||"").trim(),o++}}function a(){for(var e=o,i=t[o++],u=i.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),s={oldStart:+u[1],oldLines:+u[2]||1,newStart:+u[3],newLines:+u[4]||1,lines:[],linedelimiters:[]},a=0,l=0;o<t.length&&!(0===t[o].indexOf("--- ")&&o+2<t.length&&0===t[o+1].indexOf("+++ ")&&0===t[o+2].indexOf("@@"));o++){var f=0==t[o].length&&o!=t.length-1?" ":t[o][0];if("+"!==f&&"-"!==f&&" "!==f&&"\\"!==f)break;s.lines.push(t[o]),s.linedelimiters.push(r[o]||"\n"),"+"===f?a++:"-"===f?l++:" "===f&&(a++,l++)}if(a||1!==s.newLines||(s.newLines=0),l||1!==s.oldLines||(s.oldLines=0),n.strict){if(a!==s.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(l!==s.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return s}for(;o<t.length;)u();return i}},function(e,n){"use strict";n.__esModule=!0,n.default=function(e,n,t){var r=!0,i=!1,o=!1,u=1;return function s(){if(r&&!o){if(i?u++:r=!1,e+u<=t)return u;o=!0}if(!i)return o||(r=!0),n<=e-u?-u++:(i=!0,s())}}},function(e,n,t){"use strict";n.__esModule=!0,n.calcLineCount=s,n.merge=function(e,n,t){e=a(e,t),n=a(n,t);var r={};(e.index||n.index)&&(r.index=e.index||n.index);(e.newFileName||n.newFileName)&&(l(e)?l(n)?(r.oldFileName=f(r,e.oldFileName,n.oldFileName),r.newFileName=f(r,e.newFileName,n.newFileName),r.oldHeader=f(r,e.oldHeader,n.oldHeader),r.newHeader=f(r,e.newHeader,n.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=n.oldFileName||e.oldFileName,r.newFileName=n.newFileName||e.newFileName,r.oldHeader=n.oldHeader||e.oldHeader,r.newHeader=n.newHeader||e.newHeader));r.hunks=[];var i=0,o=0,u=0,s=0;for(;i<e.hunks.length||o<n.hunks.length;){var h=e.hunks[i]||{oldStart:1/0},g=n.hunks[o]||{oldStart:1/0};if(c(h,g))r.hunks.push(d(h,u)),i++,s+=h.newLines-h.oldLines;else if(c(g,h))r.hunks.push(d(g,s)),o++,u+=g.newLines-g.oldLines;else{var v={oldStart:Math.min(h.oldStart,g.oldStart),oldLines:0,newStart:Math.min(h.newStart+u,g.oldStart+s),newLines:0,lines:[]};p(v,h.oldStart,h.lines,g.oldStart,g.lines),o++,i++,r.hunks.push(v)}}return r};var r=t(14),i=t(11),o=t(15);function u(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function s(e){var n=function e(n){var t=0;var r=0;n.forEach(function(n){if("string"!=typeof n){var i=e(n.mine),o=e(n.theirs);void 0!==t&&(i.oldLines===o.oldLines?t+=i.oldLines:t=void 0),void 0!==r&&(i.newLines===o.newLines?r+=i.newLines:r=void 0)}else void 0===r||"+"!==n[0]&&" "!==n[0]||r++,void 0===t||"-"!==n[0]&&" "!==n[0]||t++});return{oldLines:t,newLines:r}}(e.lines),t=n.oldLines,r=n.newLines;void 0!==t?e.oldLines=t:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}function a(e,n){if("string"==typeof e){if(/^@@/m.test(e)||/^Index:/m.test(e))return(0,i.parsePatch)(e)[0];if(!n)throw new Error("Must provide a base reference or pass in a patch");return(0,r.structuredPatch)(void 0,void 0,n,e)}return e}function l(e){return e.newFileName&&e.newFileName!==e.oldFileName}function f(e,n,t){return n===t?n:(e.conflict=!0,{mine:n,theirs:t})}function c(e,n){return e.oldStart<n.oldStart&&e.oldStart+e.oldLines<n.oldStart}function d(e,n){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+n,newLines:e.newLines,lines:e.lines}}function p(e,n,t,r,i){var o={offset:n,lines:t,index:0},a={offset:r,lines:i,index:0};for(F(e,o,a),F(e,a,o);o.index<o.lines.length&&a.index<a.lines.length;){var l=o.lines[o.index],f=a.lines[a.index];if("-"!==l[0]&&"+"!==l[0]||"-"!==f[0]&&"+"!==f[0])if("+"===l[0]&&" "===f[0]){var c;(c=e.lines).push.apply(c,u(m(o)))}else if("+"===f[0]&&" "===l[0]){var d;(d=e.lines).push.apply(d,u(m(a)))}else"-"===l[0]&&" "===f[0]?g(e,o,a):"-"===f[0]&&" "===l[0]?g(e,a,o,!0):l===f?(e.lines.push(l),o.index++,a.index++):v(e,m(o),m(a));else h(e,o,a)}S(e,o),S(e,a),s(e)}function h(e,n,t){var r=m(n),i=m(t);if(y(r)&&y(i)){var s,a;if((0,o.arrayStartsWith)(r,i)&&N(t,r,r.length-i.length))return void(s=e.lines).push.apply(s,u(r));if((0,o.arrayStartsWith)(i,r)&&N(n,i,i.length-r.length))return void(a=e.lines).push.apply(a,u(i))}else if((0,o.arrayEqual)(r,i)){var l;return void(l=e.lines).push.apply(l,u(r))}v(e,r,i)}function g(e,n,t,r){var i,o=m(n),s=function(e,n){var t=[],r=[],i=0,o=!1,u=!1;for(;i<n.length&&e.index<e.lines.length;){var s=e.lines[e.index],a=n[i];if("+"===a[0])break;if(o=o||" "!==s[0],r.push(a),i++,"+"===s[0])for(u=!0;"+"===s[0];)t.push(s),s=e.lines[++e.index];a.substr(1)===s.substr(1)?(t.push(s),e.index++):u=!0}"+"===(n[i]||"")[0]&&o&&(u=!0);if(u)return t;for(;i<n.length;)r.push(n[i++]);return{merged:r,changes:t}}(t,o);s.merged?(i=e.lines).push.apply(i,u(s.merged)):v(e,r?s:o,r?o:s)}function v(e,n,t){e.conflict=!0,e.lines.push({conflict:!0,mine:n,theirs:t})}function F(e,n,t){for(;n.offset<t.offset&&n.index<n.lines.length;){var r=n.lines[n.index++];e.lines.push(r),n.offset++}}function S(e,n){for(;n.index<n.lines.length;){var t=n.lines[n.index++];e.lines.push(t)}}function m(e){for(var n=[],t=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===t&&"+"===r[0]&&(t="+"),t!==r[0])break;n.push(r),e.index++}return n}function y(e){return e.reduce(function(e,n){return e&&"-"===n[0]},!0)}function N(e,n,t){for(var r=0;r<t;r++){var i=n[n.length-t+r].substr(1);if(e.lines[e.index+r]!==" "+i)return!1}return e.index+=t,!0}},function(e,n,t){"use strict";n.__esModule=!0,n.structuredPatch=o,n.createTwoFilesPatch=u,n.createPatch=function(e,n,t,r,i,o){return u(e,e,n,t,r,i,o)};var r=t(5);function i(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function o(e,n,t,o,u,s,a){a||(a={}),void 0===a.context&&(a.context=4);var l=(0,r.diffLines)(t,o,a);function f(e){return e.map(function(e){return" "+e})}l.push({value:"",lines:[]});for(var c=[],d=0,p=0,h=[],g=1,v=1,F=function(e){var n=l[e],r=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=r,n.added||n.removed){var u;if(!d){var s=l[e-1];d=g,p=v,s&&(h=a.context>0?f(s.lines.slice(-a.context)):[],d-=h.length,p-=h.length)}(u=h).push.apply(u,i(r.map(function(e){return(n.added?"+":"-")+e}))),n.added?v+=r.length:g+=r.length}else{if(d)if(r.length<=2*a.context&&e<l.length-2){var F;(F=h).push.apply(F,i(f(r)))}else{var S,m=Math.min(r.length,a.context);(S=h).push.apply(S,i(f(r.slice(0,m))));var y={oldStart:d,oldLines:g-d+m,newStart:p,newLines:v-p+m,lines:h};if(e>=l.length-2&&r.length<=a.context){var N=/\n$/.test(t),P=/\n$/.test(o);0!=r.length||N?N&&P||h.push("\\ No newline at end of file"):h.splice(y.oldLines,0,"\\ No newline at end of file")}c.push(y),d=0,p=0,h=[]}g+=r.length,v+=r.length}},S=0;S<l.length;S++)F(S);return{oldFileName:e,newFileName:n,oldHeader:u,newHeader:s,hunks:c}}function u(e,n,t,r,i,u,s){var a=o(e,n,t,r,i,u,s),l=[];e==n&&l.push("Index: "+e),l.push("==================================================================="),l.push("--- "+a.oldFileName+(void 0===a.oldHeader?"":"\t"+a.oldHeader)),l.push("+++ "+a.newFileName+(void 0===a.newHeader?"":"\t"+a.newHeader));for(var f=0;f<a.hunks.length;f++){var c=a.hunks[f];l.push("@@ -"+c.oldStart+","+c.oldLines+" +"+c.newStart+","+c.newLines+" @@"),l.push.apply(l,c.lines)}return l.join("\n")+"\n"}},function(e,n){"use strict";function t(e,n){if(n.length>e.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}n.__esModule=!0,n.arrayEqual=function(e,n){if(e.length!==n.length)return!1;return t(e,n)},n.arrayStartsWith=t},function(e,n){"use strict";n.__esModule=!0,n.convertChangesToDMP=function(e){for(var n=[],t=void 0,r=void 0,i=0;i<e.length;i++)t=e[i],r=t.added?1:t.removed?-1:0,n.push([r,t.value]);return n}},function(e,n){"use strict";function t(e){var n=e;return n=(n=(n=(n=n.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/"/g,"&quot;")}n.__esModule=!0,n.convertChangesToXML=function(e){for(var n=[],r=0;r<e.length;r++){var i=e[r];i.added?n.push("<ins>"):i.removed&&n.push("<del>"),n.push(t(i.value)),i.added?n.push("</ins>"):i.removed&&n.push("</del>")}return n.join("")}}])})}).call(n,t(6).setTimeout)},function(e,n,t){var r,i,o=[];if(t(7)()){o=[];r=function(e,n,t,r,i,u,s,a,l,f,c,d){var p=o.length;return o.push(coscript.scheduleWithInterval_jsFunction((n||0)/1e3,function(){e(t,r,i,u,s,a,l,f,c,d)})),p},i=function(e){var n=o[e];n&&(n.cancel(),o[e]=void 0)}}else r=function(e,n,t,r,u,s,a,l,f,c,d,p){coscript.shouldKeepAround=!0;var h=o.length;return o.push(!0),coscript.scheduleWithInterval_jsFunction((n||0)/1e3,function(){o[h]&&e(t,r,u,s,a,l,f,c,d,p),i(h),o.every(function(e){return!e})&&(coscript.shouldKeepAround=!1)}),h},i=function(e){o[e]=!1};e.exports={setTimeout:r,clearTimeout:i}},function(e,n){e.exports=function(){return"undefined"!=typeof coscript&&coscript.createFiber}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.searchInLayer=function e(n,t){switch(n.type){case"Text":r.push(n);break;case"Document":for(var i=n.pages,o=0;o<[i.length];o++)e(i[o],!1);break;case"Page":case"Group":case"Artboard":for(var u=n.layers,o=0;o<[u.length];o++)e(u[o],!1);break;case MSSymbolMaster:if(1!=t)break;for(var u=n.layers,o=0;o<[u.length];o++)e(u[o],t)}return r};var r=[]}]);"default"===e&&"function"==typeof t?t(n):t[e](n)}that.testRegex=__skpm_run.bind(this,"testRegex"),that.onRun=__skpm_run.bind(this,"default");