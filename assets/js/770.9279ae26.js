/*! For license information please see 770.9279ae26.js.LICENSE.txt */
(self.webpackChunkopenstreet=self.webpackChunkopenstreet||[]).push([[770],{7531:(t,n,e)=>{"use strict";e.d(n,{lX:()=>w,q_:()=>E,ob:()=>d,PP:()=>X,Ep:()=>h});var r=e(2122);function i(t){return"/"===t.charAt(0)}function o(t,n){for(var e=n,r=e+1,i=t.length;r<i;e+=1,r+=1)t[e]=t[r];t.pop()}const a=function(t,n){void 0===n&&(n="");var e,r=t&&t.split("/")||[],a=n&&n.split("/")||[],c=t&&i(t),s=n&&i(n),u=c||s;if(t&&i(t)?a=r:r.length&&(a.pop(),a=a.concat(r)),!a.length)return"/";if(a.length){var f=a[a.length-1];e="."===f||".."===f||""===f}else e=!1;for(var l=0,h=a.length;h>=0;h--){var d=a[h];"."===d?o(a,h):".."===d?(o(a,h),l++):l&&(o(a,h),l--)}if(!u)for(;l--;l)a.unshift("..");!u||""===a[0]||a[0]&&i(a[0])||a.unshift("");var p=a.join("/");return e&&"/"!==p.substr(-1)&&(p+="/"),p};var c=e(2177);function s(t){return"/"===t.charAt(0)?t:"/"+t}function u(t){return"/"===t.charAt(0)?t.substr(1):t}function f(t,n){return function(t,n){return 0===t.toLowerCase().indexOf(n.toLowerCase())&&-1!=="/?#".indexOf(t.charAt(n.length))}(t,n)?t.substr(n.length):t}function l(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t}function h(t){var n=t.pathname,e=t.search,r=t.hash,i=n||"/";return e&&"?"!==e&&(i+="?"===e.charAt(0)?e:"?"+e),r&&"#"!==r&&(i+="#"===r.charAt(0)?r:"#"+r),i}function d(t,n,e,i){var o;"string"===typeof t?(o=function(t){var n=t||"/",e="",r="",i=n.indexOf("#");-1!==i&&(r=n.substr(i),n=n.substr(0,i));var o=n.indexOf("?");return-1!==o&&(e=n.substr(o),n=n.substr(0,o)),{pathname:n,search:"?"===e?"":e,hash:"#"===r?"":r}}(t)).state=n:(void 0===(o=(0,r.Z)({},t)).pathname&&(o.pathname=""),o.search?"?"!==o.search.charAt(0)&&(o.search="?"+o.search):o.search="",o.hash?"#"!==o.hash.charAt(0)&&(o.hash="#"+o.hash):o.hash="",void 0!==n&&void 0===o.state&&(o.state=n));try{o.pathname=decodeURI(o.pathname)}catch(c){throw c instanceof URIError?new URIError('Pathname "'+o.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):c}return e&&(o.key=e),i?o.pathname?"/"!==o.pathname.charAt(0)&&(o.pathname=a(o.pathname,i.pathname)):o.pathname=i.pathname:o.pathname||(o.pathname="/"),o}function p(){var t=null;var n=[];return{setPrompt:function(n){return t=n,function(){t===n&&(t=null)}},confirmTransitionTo:function(n,e,r,i){if(null!=t){var o="function"===typeof t?t(n,e):t;"string"===typeof o?"function"===typeof r?r(o,i):i(!0):i(!1!==o)}else i(!0)},appendListener:function(t){var e=!0;function r(){e&&t.apply(void 0,arguments)}return n.push(r),function(){e=!1,n=n.filter((function(t){return t!==r}))}},notifyListeners:function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];n.forEach((function(t){return t.apply(void 0,e)}))}}}var v=!("undefined"===typeof window||!window.document||!window.document.createElement);function m(t,n){n(window.confirm(t))}var g="popstate",y="hashchange";function x(){try{return window.history.state||{}}catch(t){return{}}}function w(t){void 0===t&&(t={}),v||(0,c.Z)(!1);var n,e=window.history,i=(-1===(n=window.navigator.userAgent).indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history,o=!(-1===window.navigator.userAgent.indexOf("Trident")),a=t,u=a.forceRefresh,w=void 0!==u&&u,b=a.getUserConfirmation,O=void 0===b?m:b,M=a.keyLength,P=void 0===M?6:M,_=t.basename?l(s(t.basename)):"";function E(t){var n=t||{},e=n.key,r=n.state,i=window.location,o=i.pathname+i.search+i.hash;return _&&(o=f(o,_)),d(o,r,e)}function B(){return Math.random().toString(36).substr(2,P)}var X=p();function A(t){(0,r.Z)(D,t),D.length=e.length,X.notifyListeners(D.location,D.action)}function C(t){(function(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")})(t)||T(E(t.state))}function R(){T(E(x()))}var k=!1;function T(t){if(k)k=!1,A();else{X.confirmTransitionTo(t,"POP",O,(function(n){n?A({action:"POP",location:t}):function(t){var n=D.location,e=S.indexOf(n.key);-1===e&&(e=0);var r=S.indexOf(t.key);-1===r&&(r=0);var i=e-r;i&&(k=!0,L(i))}(t)}))}}var Y=E(x()),S=[Y.key];function j(t){return _+h(t)}function L(t){e.go(t)}var N=0;function Z(t){1===(N+=t)&&1===t?(window.addEventListener(g,C),o&&window.addEventListener(y,R)):0===N&&(window.removeEventListener(g,C),o&&window.removeEventListener(y,R))}var H=!1;var D={length:e.length,action:"POP",location:Y,createHref:j,push:function(t,n){var r="PUSH",o=d(t,n,B(),D.location);X.confirmTransitionTo(o,r,O,(function(t){if(t){var n=j(o),a=o.key,c=o.state;if(i)if(e.pushState({key:a,state:c},null,n),w)window.location.href=n;else{var s=S.indexOf(D.location.key),u=S.slice(0,s+1);u.push(o.key),S=u,A({action:r,location:o})}else window.location.href=n}}))},replace:function(t,n){var r="REPLACE",o=d(t,n,B(),D.location);X.confirmTransitionTo(o,r,O,(function(t){if(t){var n=j(o),a=o.key,c=o.state;if(i)if(e.replaceState({key:a,state:c},null,n),w)window.location.replace(n);else{var s=S.indexOf(D.location.key);-1!==s&&(S[s]=o.key),A({action:r,location:o})}else window.location.replace(n)}}))},go:L,goBack:function(){L(-1)},goForward:function(){L(1)},block:function(t){void 0===t&&(t=!1);var n=X.setPrompt(t);return H||(Z(1),H=!0),function(){return H&&(H=!1,Z(-1)),n()}},listen:function(t){var n=X.appendListener(t);return Z(1),function(){Z(-1),n()}}};return D}var b="hashchange",O={hashbang:{encodePath:function(t){return"!"===t.charAt(0)?t:"!/"+u(t)},decodePath:function(t){return"!"===t.charAt(0)?t.substr(1):t}},noslash:{encodePath:u,decodePath:s},slash:{encodePath:s,decodePath:s}};function M(t){var n=t.indexOf("#");return-1===n?t:t.slice(0,n)}function P(){var t=window.location.href,n=t.indexOf("#");return-1===n?"":t.substring(n+1)}function _(t){window.location.replace(M(window.location.href)+"#"+t)}function E(t){void 0===t&&(t={}),v||(0,c.Z)(!1);var n=window.history,e=(window.navigator.userAgent.indexOf("Firefox"),t),i=e.getUserConfirmation,o=void 0===i?m:i,a=e.hashType,u=void 0===a?"slash":a,g=t.basename?l(s(t.basename)):"",y=O[u],x=y.encodePath,w=y.decodePath;function E(){var t=w(P());return g&&(t=f(t,g)),d(t)}var B=p();function X(t){(0,r.Z)(H,t),H.length=n.length,B.notifyListeners(H.location,H.action)}var A=!1,C=null;function R(){var t,n,e=P(),r=x(e);if(e!==r)_(r);else{var i=E(),a=H.location;if(!A&&(n=i,(t=a).pathname===n.pathname&&t.search===n.search&&t.hash===n.hash))return;if(C===h(i))return;C=null,function(t){if(A)A=!1,X();else{var n="POP";B.confirmTransitionTo(t,n,o,(function(e){e?X({action:n,location:t}):function(t){var n=H.location,e=S.lastIndexOf(h(n));-1===e&&(e=0);var r=S.lastIndexOf(h(t));-1===r&&(r=0);var i=e-r;i&&(A=!0,j(i))}(t)}))}}(i)}}var k=P(),T=x(k);k!==T&&_(T);var Y=E(),S=[h(Y)];function j(t){n.go(t)}var L=0;function N(t){1===(L+=t)&&1===t?window.addEventListener(b,R):0===L&&window.removeEventListener(b,R)}var Z=!1;var H={length:n.length,action:"POP",location:Y,createHref:function(t){var n=document.querySelector("base"),e="";return n&&n.getAttribute("href")&&(e=M(window.location.href)),e+"#"+x(g+h(t))},push:function(t,n){var e="PUSH",r=d(t,void 0,void 0,H.location);B.confirmTransitionTo(r,e,o,(function(t){if(t){var n=h(r),i=x(g+n);if(P()!==i){C=n,function(t){window.location.hash=t}(i);var o=S.lastIndexOf(h(H.location)),a=S.slice(0,o+1);a.push(n),S=a,X({action:e,location:r})}else X()}}))},replace:function(t,n){var e="REPLACE",r=d(t,void 0,void 0,H.location);B.confirmTransitionTo(r,e,o,(function(t){if(t){var n=h(r),i=x(g+n);P()!==i&&(C=n,_(i));var o=S.indexOf(h(H.location));-1!==o&&(S[o]=n),X({action:e,location:r})}}))},go:j,goBack:function(){j(-1)},goForward:function(){j(1)},block:function(t){void 0===t&&(t=!1);var n=B.setPrompt(t);return Z||(N(1),Z=!0),function(){return Z&&(Z=!1,N(-1)),n()}},listen:function(t){var n=B.appendListener(t);return N(1),function(){N(-1),n()}}};return H}function B(t,n,e){return Math.min(Math.max(t,n),e)}function X(t){void 0===t&&(t={});var n=t,e=n.getUserConfirmation,i=n.initialEntries,o=void 0===i?["/"]:i,a=n.initialIndex,c=void 0===a?0:a,s=n.keyLength,u=void 0===s?6:s,f=p();function l(t){(0,r.Z)(w,t),w.length=w.entries.length,f.notifyListeners(w.location,w.action)}function v(){return Math.random().toString(36).substr(2,u)}var m=B(c,0,o.length-1),g=o.map((function(t){return d(t,void 0,"string"===typeof t?v():t.key||v())})),y=h;function x(t){var n=B(w.index+t,0,w.entries.length-1),r=w.entries[n];f.confirmTransitionTo(r,"POP",e,(function(t){t?l({action:"POP",location:r,index:n}):l()}))}var w={length:g.length,action:"POP",location:g[m],index:m,entries:g,createHref:y,push:function(t,n){var r="PUSH",i=d(t,n,v(),w.location);f.confirmTransitionTo(i,r,e,(function(t){if(t){var n=w.index+1,e=w.entries.slice(0);e.length>n?e.splice(n,e.length-n,i):e.push(i),l({action:r,location:i,index:n,entries:e})}}))},replace:function(t,n){var r="REPLACE",i=d(t,n,v(),w.location);f.confirmTransitionTo(i,r,e,(function(t){t&&(w.entries[w.index]=i,l({action:r,location:i}))}))},go:x,goBack:function(){x(-1)},goForward:function(){x(1)},canGo:function(t){var n=w.index+t;return n>=0&&n<w.entries.length},block:function(t){return void 0===t&&(t=!1),f.setPrompt(t)},listen:function(t){return f.appendListener(t)}};return w}},8679:(t,n,e)=>{"use strict";var r=e(9864),i={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};function s(t){return r.isMemo(t)?a:c[t.$$typeof]||i}c[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},c[r.Memo]=a;var u=Object.defineProperty,f=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,h=Object.getOwnPropertyDescriptor,d=Object.getPrototypeOf,p=Object.prototype;t.exports=function t(n,e,r){if("string"!==typeof e){if(p){var i=d(e);i&&i!==p&&t(n,i,r)}var a=f(e);l&&(a=a.concat(l(e)));for(var c=s(n),v=s(e),m=0;m<a.length;++m){var g=a[m];if(!o[g]&&(!r||!r[g])&&(!v||!v[g])&&(!c||!c[g])){var y=h(e,g);try{u(n,g,y)}catch(x){}}}}return n}},4523:(t,n,e)=>{"use strict";e.d(n,{Z:()=>f});var r=e(7294),i=e(3552),o=e(5697),a=e.n(o),c=1073741823,s="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof e.g?e.g:{};function u(t){var n=[];return{on:function(t){n.push(t)},off:function(t){n=n.filter((function(n){return n!==t}))},get:function(){return t},set:function(e,r){t=e,n.forEach((function(n){return n(t,r)}))}}}const f=r.createContext||function(t,n){var e,o,f,l="__create-react-context-"+((s[f="__global_unique_id__"]=(s[f]||0)+1)+"__"),h=function(t){function e(){var n;return(n=t.apply(this,arguments)||this).emitter=u(n.props.value),n}(0,i.Z)(e,t);var r=e.prototype;return r.getChildContext=function(){var t;return(t={})[l]=this.emitter,t},r.componentWillReceiveProps=function(t){if(this.props.value!==t.value){var e,r=this.props.value,i=t.value;((o=r)===(a=i)?0!==o||1/o===1/a:o!==o&&a!==a)?e=0:(e="function"===typeof n?n(r,i):c,0!==(e|=0)&&this.emitter.set(t.value,e))}var o,a},r.render=function(){return this.props.children},e}(r.Component);h.childContextTypes=((e={})[l]=a().object.isRequired,e);var d=function(n){function e(){var t;return(t=n.apply(this,arguments)||this).state={value:t.getValue()},t.onUpdate=function(n,e){0!==((0|t.observedBits)&e)&&t.setState({value:t.getValue()})},t}(0,i.Z)(e,n);var r=e.prototype;return r.componentWillReceiveProps=function(t){var n=t.observedBits;this.observedBits=void 0===n||null===n?c:n},r.componentDidMount=function(){this.context[l]&&this.context[l].on(this.onUpdate);var t=this.props.observedBits;this.observedBits=void 0===t||null===t?c:t},r.componentWillUnmount=function(){this.context[l]&&this.context[l].off(this.onUpdate)},r.getValue=function(){return this.context[l]?this.context[l].get():t},r.render=function(){return(t=this.props.children,Array.isArray(t)?t[0]:t)(this.state.value);var t},e}(r.Component);return d.contextTypes=((o={})[l]=a().object,o),{Provider:h,Consumer:d}}},4783:(t,n,e)=>{"use strict";var r=e(5618),i=Object.create(null),o="undefined"===typeof document,a=Array.prototype.forEach;function c(){}function s(t,n){if(!n){if(!t.href)return;n=t.href.split("?")[0]}if(l(n)&&!1!==t.isLoaded&&n&&n.indexOf(".css")>-1){t.visited=!0;var e=t.cloneNode();e.isLoaded=!1,e.addEventListener("load",(function(){e.isLoaded||(e.isLoaded=!0,t.parentNode.removeChild(t))})),e.addEventListener("error",(function(){e.isLoaded||(e.isLoaded=!0,t.parentNode.removeChild(t))})),e.href="".concat(n,"?").concat(Date.now()),t.nextSibling?t.parentNode.insertBefore(e,t.nextSibling):t.parentNode.appendChild(e)}}function u(t){if(!t)return!1;var n=document.querySelectorAll("link"),e=!1;return a.call(n,(function(n){if(n.href){var i=function(t,n){var e;return t=r(t,{stripWWW:!1}),n.some((function(r){t.indexOf(n)>-1&&(e=r)})),e}(n.href,t);l(i)&&!0!==n.visited&&i&&(s(n,i),e=!0)}})),e}function f(){var t=document.querySelectorAll("link");a.call(t,(function(t){!0!==t.visited&&s(t)}))}function l(t){return!!/^https?:/i.test(t)}t.exports=function(t,n){if(o)return console.log("no window.document found, will not HMR CSS"),c;var e,a,s,l=function(t){var n=i[t];if(!n){if(document.currentScript)n=document.currentScript.src;else{var e=document.getElementsByTagName("script"),o=e[e.length-1];o&&(n=o.src)}i[t]=n}return function(t){if(!n)return null;var e=n.split(/([^\\/]+)\.js$/),i=e&&e[1];return i&&t?t.split(",").map((function(t){var e=new RegExp("".concat(i,"\\.js$"),"g");return r(n.replace(e,"".concat(t.replace(/{fileName}/g,i),".css")))})):[n.replace(".js",".css")]}}(t);return e=function(){var t=l(n.filename),e=u(t);if(n.locals)return console.log("[HMR] Detected local css modules. Reload all css"),void f();e?console.log("[HMR] css reload %s",t.join(" ")):(console.log("[HMR] Reload all css"),f())},a=50,s=0,function(){var t=this,n=arguments,r=function(){return e.apply(t,n)};clearTimeout(s),s=setTimeout(r,a)}}},5618:t=>{"use strict";t.exports=function(t){if(t=t.trim(),/^data:/i.test(t))return t;var n=-1!==t.indexOf("//")?t.split("//")[0]+"//":"",e=t.replace(new RegExp(n,"i"),"").split("/"),r=e[0].toLowerCase().replace(/\.$/,"");return e[0]="",n+r+e.reduce((function(t,n){switch(n){case"..":t.pop();break;case".":break;default:t.push(n)}return t}),[]).join("/")}},7418:t=>{"use strict";var n=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function i(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var n={},e=0;e<10;e++)n["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(n).map((function(t){return n[t]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(t){r[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(i){return!1}}()?Object.assign:function(t,o){for(var a,c,s=i(t),u=1;u<arguments.length;u++){for(var f in a=Object(arguments[u]))e.call(a,f)&&(s[f]=a[f]);if(n){c=n(a);for(var l=0;l<c.length;l++)r.call(a,c[l])&&(s[c[l]]=a[c[l]])}}return s}},2582:function(t){t.exports=function(){"use strict";function t(t,r,i,o,a){!function t(e,r,i,o,a){for(;o>i;){if(o-i>600){var c=o-i+1,s=r-i+1,u=Math.log(c),f=.5*Math.exp(2*u/3),l=.5*Math.sqrt(u*f*(c-f)/c)*(s-c/2<0?-1:1);t(e,r,Math.max(i,Math.floor(r-s*f/c+l)),Math.min(o,Math.floor(r+(c-s)*f/c+l)),a)}var h=e[r],d=i,p=o;for(n(e,i,r),a(e[o],h)>0&&n(e,i,o);d<p;){for(n(e,d,p),d++,p--;a(e[d],h)<0;)d++;for(;a(e[p],h)>0;)p--}0===a(e[i],h)?n(e,i,p):n(e,++p,o),p<=r&&(i=p+1),r<=p&&(o=p-1)}}(t,r,i||0,o||t.length-1,a||e)}function n(t,n,e){var r=t[n];t[n]=t[e],t[e]=r}function e(t,n){return t<n?-1:t>n?1:0}var r=function(t){void 0===t&&(t=9),this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()};function i(t,n,e){if(!e)return n.indexOf(t);for(var r=0;r<n.length;r++)if(e(t,n[r]))return r;return-1}function o(t,n){a(t,0,t.children.length,n,t)}function a(t,n,e,r,i){i||(i=p(null)),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(var o=n;o<e;o++){var a=t.children[o];c(i,t.leaf?r(a):a)}return i}function c(t,n){return t.minX=Math.min(t.minX,n.minX),t.minY=Math.min(t.minY,n.minY),t.maxX=Math.max(t.maxX,n.maxX),t.maxY=Math.max(t.maxY,n.maxY),t}function s(t,n){return t.minX-n.minX}function u(t,n){return t.minY-n.minY}function f(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function l(t){return t.maxX-t.minX+(t.maxY-t.minY)}function h(t,n){return t.minX<=n.minX&&t.minY<=n.minY&&n.maxX<=t.maxX&&n.maxY<=t.maxY}function d(t,n){return n.minX<=t.maxX&&n.minY<=t.maxY&&n.maxX>=t.minX&&n.maxY>=t.minY}function p(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function v(n,e,r,i,o){for(var a=[e,r];a.length;)if(!((r=a.pop())-(e=a.pop())<=i)){var c=e+Math.ceil((r-e)/i/2)*i;t(n,c,e,r,o),a.push(e,c,c,r)}}return r.prototype.all=function(){return this._all(this.data,[])},r.prototype.search=function(t){var n=this.data,e=[];if(!d(t,n))return e;for(var r=this.toBBox,i=[];n;){for(var o=0;o<n.children.length;o++){var a=n.children[o],c=n.leaf?r(a):a;d(t,c)&&(n.leaf?e.push(a):h(t,c)?this._all(a,e):i.push(a))}n=i.pop()}return e},r.prototype.collides=function(t){var n=this.data;if(!d(t,n))return!1;for(var e=[];n;){for(var r=0;r<n.children.length;r++){var i=n.children[r],o=n.leaf?this.toBBox(i):i;if(d(t,o)){if(n.leaf||h(t,o))return!0;e.push(i)}}n=e.pop()}return!1},r.prototype.load=function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var n=0;n<t.length;n++)this.insert(t[n]);return this}var e=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===e.height)this._splitRoot(this.data,e);else{if(this.data.height<e.height){var r=this.data;this.data=e,e=r}this._insert(e,this.data.height-e.height-1,!0)}else this.data=e;return this},r.prototype.insert=function(t){return t&&this._insert(t,this.data.height-1),this},r.prototype.clear=function(){return this.data=p([]),this},r.prototype.remove=function(t,n){if(!t)return this;for(var e,r,o,a=this.data,c=this.toBBox(t),s=[],u=[];a||s.length;){if(a||(a=s.pop(),r=s[s.length-1],e=u.pop(),o=!0),a.leaf){var f=i(t,a.children,n);if(-1!==f)return a.children.splice(f,1),s.push(a),this._condense(s),this}o||a.leaf||!h(a,c)?r?(e++,a=r.children[e],o=!1):a=null:(s.push(a),u.push(e),e=0,r=a,a=a.children[0])}return this},r.prototype.toBBox=function(t){return t},r.prototype.compareMinX=function(t,n){return t.minX-n.minX},r.prototype.compareMinY=function(t,n){return t.minY-n.minY},r.prototype.toJSON=function(){return this.data},r.prototype.fromJSON=function(t){return this.data=t,this},r.prototype._all=function(t,n){for(var e=[];t;)t.leaf?n.push.apply(n,t.children):e.push.apply(e,t.children),t=e.pop();return n},r.prototype._build=function(t,n,e,r){var i,a=e-n+1,c=this._maxEntries;if(a<=c)return o(i=p(t.slice(n,e+1)),this.toBBox),i;r||(r=Math.ceil(Math.log(a)/Math.log(c)),c=Math.ceil(a/Math.pow(c,r-1))),(i=p([])).leaf=!1,i.height=r;var s=Math.ceil(a/c),u=s*Math.ceil(Math.sqrt(c));v(t,n,e,u,this.compareMinX);for(var f=n;f<=e;f+=u){var l=Math.min(f+u-1,e);v(t,f,l,s,this.compareMinY);for(var h=f;h<=l;h+=s){var d=Math.min(h+s-1,l);i.children.push(this._build(t,h,d,r-1))}}return o(i,this.toBBox),i},r.prototype._chooseSubtree=function(t,n,e,r){for(;r.push(n),!n.leaf&&r.length-1!==e;){for(var i=1/0,o=1/0,a=void 0,c=0;c<n.children.length;c++){var s=n.children[c],u=f(s),l=(h=t,d=s,(Math.max(d.maxX,h.maxX)-Math.min(d.minX,h.minX))*(Math.max(d.maxY,h.maxY)-Math.min(d.minY,h.minY))-u);l<o?(o=l,i=u<i?u:i,a=s):l===o&&u<i&&(i=u,a=s)}n=a||n.children[0]}var h,d;return n},r.prototype._insert=function(t,n,e){var r=e?t:this.toBBox(t),i=[],o=this._chooseSubtree(r,this.data,n,i);for(o.children.push(t),c(o,r);n>=0&&i[n].children.length>this._maxEntries;)this._split(i,n),n--;this._adjustParentBBoxes(r,i,n)},r.prototype._split=function(t,n){var e=t[n],r=e.children.length,i=this._minEntries;this._chooseSplitAxis(e,i,r);var a=this._chooseSplitIndex(e,i,r),c=p(e.children.splice(a,e.children.length-a));c.height=e.height,c.leaf=e.leaf,o(e,this.toBBox),o(c,this.toBBox),n?t[n-1].children.push(c):this._splitRoot(e,c)},r.prototype._splitRoot=function(t,n){this.data=p([t,n]),this.data.height=t.height+1,this.data.leaf=!1,o(this.data,this.toBBox)},r.prototype._chooseSplitIndex=function(t,n,e){for(var r,i,o,c,s,u,l,h=1/0,d=1/0,p=n;p<=e-n;p++){var v=a(t,0,p,this.toBBox),m=a(t,p,e,this.toBBox),g=(i=v,o=m,c=void 0,s=void 0,u=void 0,l=void 0,c=Math.max(i.minX,o.minX),s=Math.max(i.minY,o.minY),u=Math.min(i.maxX,o.maxX),l=Math.min(i.maxY,o.maxY),Math.max(0,u-c)*Math.max(0,l-s)),y=f(v)+f(m);g<h?(h=g,r=p,d=y<d?y:d):g===h&&y<d&&(d=y,r=p)}return r||e-n},r.prototype._chooseSplitAxis=function(t,n,e){var r=t.leaf?this.compareMinX:s,i=t.leaf?this.compareMinY:u;this._allDistMargin(t,n,e,r)<this._allDistMargin(t,n,e,i)&&t.children.sort(r)},r.prototype._allDistMargin=function(t,n,e,r){t.children.sort(r);for(var i=this.toBBox,o=a(t,0,n,i),s=a(t,e-n,e,i),u=l(o)+l(s),f=n;f<e-n;f++){var h=t.children[f];c(o,t.leaf?i(h):h),u+=l(o)}for(var d=e-n-1;d>=n;d--){var p=t.children[d];c(s,t.leaf?i(p):p),u+=l(s)}return u},r.prototype._adjustParentBBoxes=function(t,n,e){for(var r=e;r>=0;r--)c(n[r],t)},r.prototype._condense=function(t){for(var n=t.length-1,e=void 0;n>=0;n--)0===t[n].children.length?n>0?(e=t[n-1].children).splice(e.indexOf(t[n]),1):this.clear():o(t[n],this.toBBox)},r}()},7209:(t,n,e)=>{"use strict";var r,i=(r=e(7294))&&"object"==typeof r&&"default"in r?r.default:r;function o(t){return o.warnAboutHMRDisabled&&(o.warnAboutHMRDisabled=!0,console.error("React-Hot-Loader: misconfiguration detected, using production version in non-production environment."),console.error("React-Hot-Loader: Hot Module Replacement is not enabled.")),i.Children.only(t.children)}o.warnAboutHMRDisabled=!1;var a=function t(){return t.shouldWrapWithAppContainer?function(t){return function(n){return i.createElement(o,null,i.createElement(t,n))}}:function(t){return t}};a.shouldWrapWithAppContainer=!1;n.wU=a},3727:(t,n,e)=>{"use strict";e.d(n,{VK:()=>f,rU:()=>m});var r=e(6550),i=e(3552),o=e(7294),a=e(7531),c=(e(5697),e(2122)),s=e(9756),u=e(2177),f=function(t){function n(){for(var n,e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return(n=t.call.apply(t,[this].concat(r))||this).history=(0,a.lX)(n.props),n}return(0,i.Z)(n,t),n.prototype.render=function(){return o.createElement(r.F0,{history:this.history,children:this.props.children})},n}(o.Component);o.Component;var l=function(t,n){return"function"===typeof t?t(n):t},h=function(t,n){return"string"===typeof t?(0,a.ob)(t,null,null,n):t},d=function(t){return t},p=o.forwardRef;"undefined"===typeof p&&(p=d);var v=p((function(t,n){var e=t.innerRef,r=t.navigate,i=t.onClick,a=(0,s.Z)(t,["innerRef","navigate","onClick"]),u=a.target,f=(0,c.Z)({},a,{onClick:function(t){try{i&&i(t)}catch(n){throw t.preventDefault(),n}t.defaultPrevented||0!==t.button||u&&"_self"!==u||function(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)||(t.preventDefault(),r())}});return f.ref=d!==p&&n||e,o.createElement("a",f)}));var m=p((function(t,n){var e=t.component,i=void 0===e?v:e,a=t.replace,f=t.to,m=t.innerRef,g=(0,s.Z)(t,["component","replace","to","innerRef"]);return o.createElement(r.s6.Consumer,null,(function(t){t||(0,u.Z)(!1);var e=t.history,r=h(l(f,t.location),t.location),s=r?e.createHref(r):"",v=(0,c.Z)({},g,{href:s,navigate:function(){var n=l(f,t.location);(a?e.replace:e.push)(n)}});return d!==p?v.ref=n||m:v.innerRef=m,o.createElement(i,v)}))})),g=function(t){return t},y=o.forwardRef;"undefined"===typeof y&&(y=g);y((function(t,n){var e=t["aria-current"],i=void 0===e?"page":e,a=t.activeClassName,f=void 0===a?"active":a,d=t.activeStyle,p=t.className,v=t.exact,x=t.isActive,w=t.location,b=t.sensitive,O=t.strict,M=t.style,P=t.to,_=t.innerRef,E=(0,s.Z)(t,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return o.createElement(r.s6.Consumer,null,(function(t){t||(0,u.Z)(!1);var e=w||t.location,a=h(l(P,e),e),s=a.pathname,B=s&&s.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),X=B?(0,r.LX)(e.pathname,{path:B,exact:v,sensitive:b,strict:O}):null,A=!!(x?x(X,e):X),C=A?function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return n.filter((function(t){return t})).join(" ")}(p,f):p,R=A?(0,c.Z)({},M,{},d):M,k=(0,c.Z)({"aria-current":A&&i||null,className:C,style:R,to:a},E);return g!==y?k.ref=n||_:k.innerRef=_,o.createElement(m,k)}))}))},2177:(t,n,e)=>{"use strict";e.d(n,{Z:()=>i});var r="Invariant failed";const i=function(t,n){if(!t)throw new Error(r)}}}]);