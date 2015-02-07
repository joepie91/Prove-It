!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.prove=n()}}(function(){var t,n,r;return function e(t,n,r){function e(u,f){if(!n[u]){if(!t[u]){var s="function"==typeof require&&require;if(!f&&s)return s(u,!0);if(o)return o(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var i=n[u]={exports:{}};t[u][0].call(i.exports,function(n){var r=t[u][1][n];return e(r?r:n)},i,i.exports,e,t,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)e(r[u]);return e}({1:[function(n,r,e){"use strict";var t=n("../util.js");r.exports={eval:function(){var t=arguments;return function(e){for(var n,r=0;r<t.length;r+=1)n=t[r](e),null!=n&&null!=n.test&&this.merge(n.test(e));return!0}},"try":function(){var t=arguments;return function(e){var n,r;for(n=0;n<t.length;n+=1)if(r=t[n],null!=r&&null!=r.test&&!0===r.test(e))return!0;for(n=0;n<t.length;n+=1)r=t[n],null!=r&&null!=r.test&&this.merge(r.test(e));return!0}},equals:function(){var t=arguments;return function(r){for(var n=0;n<t.length;n+=1)if(t[n]===r)return!0;return!1}},integer:function(){return function(t){return 0===t%1}},precision:function(n){return function(r){return t.is.Number(r)&&n>=(r.toString().split(".")[1]||"").length}},divisibleBy:function(t){return function(n){return 0===n%t}},min:function(t){return function(n){return t>=n}},max:function(t){return function(n){return n>=t}},less:function(t){return function(n){return t>n}},more:function(t){return function(n){return n>t}},empty:function(){return t.is.Empty},length:function(t,n){return t=t||0,function(r){return t<=r.length&&(null==n||n>=r.length)}},unique:function(){return function(t){var r=[];for(var n in t)if(t.hasOwnProperty(n)){if(-1!==r.indexOf(t[n]))return!1;r.push(t[n])}return!0}},startsWith:function(t){return function(n){return 0===n.indexOf(t)}},endsWith:function(t){return function(n){var r=null!=t&&null!=t.length?n.length-t.length:n.length-1;return 0>r&&(r=0),r===n.indexOf(t)}},sorted:function(t){return t=t||function(t,n){return t>n?1:n>t?-1:0},function(r){for(var n=1;n<r.length;n+=1)if(0<t(r[n-1],r[n]))return!1;return!0}},contains:function(){var t=arguments;return function(r){if(0===t.length)return!1;for(var n=0;n<t.length;n+=1)if(0>r.indexOf(t[n]))return!1;return!0}},matches:function(t){return RegExp.prototype.test.bind(t)},lowerCase:function(){return function(t){return t.toLowerCase()===t}},upperCase:function(){return function(t){return t.toUpperCase()===t}},json:function(){return function(t){try{return JSON.parse(t),!0}catch(n){return!1}}}}},{"../util.js":6}],2:[function(e,r,u){"use strict";var t={v4:/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,v6:/^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/},n={visa:/^4[0-9]{12}(?:[0-9]{3})?$/,mastercard:/^5[1-5][0-9]{14}$/,americanexpress:/^3[47][0-9]{13}$/,dinersclub:/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,discover:/^6(?:011|5[0-9]{2})[0-9]{12}$/,jcb:/^(?:2131|1800|35\d{3})\d{11}$/};r.exports={alpha:function(){return function(t){return/^[a-zA-z]+$/.test(t)}},numeric:function(){return function(t){return/^-?[0-9]+$/.test(t)}},alphaNumeric:function(){return function(t){return/^[a-zA-Z0-9]+$/.test(t)}},hex:function(){return function(t){return/^[0-9a-fA-F]+$/.test(t)}},hexColor:function(){return function(t){return/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)}},ascii:function(){return function(t){return/^[\x00-\x7F]+$/.test(t)}},html:function(){return function(t){return/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/.test(t)}},mongoId:function(){return function(t){return/^[0-9a-fA-F]{24}$/.test(t)}},email:function(){return function(t){return/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)}},ip:function(n){return n=Number(n),function(r){return 4===n?t.v4.test(r):6===n?t.v6.test(r):t.v4.test(r)||t.v6.test(r)}},phoneNumber:function(){return function(t){var n=t.replace(/[^0-9]/g,"").length;return t.replace(/[^0-9\-\.\(\) \+\/]/,"")===t&&14>n&&n>=7}},creditCard:function(){var t=0===arguments.length?Object.keys(n):arguments;return function(r){r=r.replace(/-| /g,"");for(var e=0;e<t.length;e+=1)if(n[t[e].toLowerCase()].test(r))return!0;return!1}}}},{}],3:[function(n,r,e){"use strict";var t=n("../util.js");r.exports={string:function(){return t.is.String},number:function(){return t.is.Number},"boolean":function(){return t.is.Boolean},date:function(){return t.is.Date},regExp:function(){return t.is.RegExp},error:function(){return t.is.Error},"function":function(){return t.is.Function},arguments:function(){return t.is.Arguments},object:function(){var n={},e;if(this.isNegated&&0!==arguments.length)throw new Error("Prove-It: not.Object can not accept arguments.");for(var u=0;u<arguments.length;u+=1){e=arguments[u];for(var r in e)if(e.hasOwnProperty(r)){if(null==e[r]||null==e[r].test)throw new Error("Prove-It: Non test provided at "+r);n[r]=n[r]||[],n[r].push(e[r])}}return function(e){var i=t.is.Object(e),s,r,u;if(i&&!t.is.Empty(n)){for(r in n)if(n.hasOwnProperty(r)){u=e[r];for(var o=0;o<n[r].length;o+=1)s=n[r][o],this.merge(s.test(u),r)}for(r in e)e.hasOwnProperty(r)&&(u=e[r],null==n[r]&&this.append({type:"extraField",value:u},r))}return i}},array:function(){var n=[];if(this.isNegated&&0!==arguments.length)throw new Error("Prove-It: not.Array can not accept arguments.");for(var r=0;r<arguments.length;r+=1){if(null==arguments[r].test)throw new Error("Prove-It: Non test provided to array validator");n.push(arguments[r])}return function(e){var o=t.is.Array(e),i,s;if(o&&!t.is.Empty(n))for(var r=0;r<e.length;r+=1){s=e[r];for(var u=0;u<n.length;u+=1)i=n[u],this.merge(i.test(s),r)}return o}}}},{"../util.js":6}],4:[function(n,r,e){"use strict";var t=n("./util.js");r.exports=function(){var n={},r={append:function(r,e){e=null==e?"":e;var o=n[e]=n[e]||[];t.is.Array(r)||(r=[r]);for(var u=0;u<r.length;u+=1)o.push(r[u])},merge:function(o,n){n=null==n?"":n;var e=o.errors;if(!0!==o)if(t.is.Array(e))r.append(e,n);else if(t.is.Object(e)){""!==n&&(n+=".");for(var u in e)e.hasOwnProperty(u)&&r.append(e[u],n+u)}},errors:n};return r}},{"./util.js":6}],5:[function(r,i,a){"use strict";var e=r("./util.js"),s=r("./errorHandler.js"),u=function(t){this.name="ValidationError",this.message="Validation Failed",this.errors=t};u.prototype=Error.prototype;var n={};n.a=n.and=n.as=n.be=n.have=n.with=n.which=n.is=n.it=n.of=n;var t=function(){return this instanceof t?(this.isRequired=!0,this.selected=[],this.annotations={},this.not=Object.create(n),void(this.not._self=this._self=this.a=this.and=this.as=this.be=this.have=this.with=this.which=this.is=this.it=this.of=this)):new t};t.prototype.test=function(r){var a=this.annotations,n=s(),t=n.errors,o;if(null==r)this.isRequired&&n.append(e.merge({type:"required",value:void 0},a));else for(var i=0;i<this.selected.length;i+=1){o=this.selected[i];try{if(!0!==o.call(n,r))throw 0}catch(f){n.append(e.merge({value:r},o.config,a))}}return e.is.Empty(t)||new u(1===Object.keys(t).length&&null!=t[""]?t[""]:t)},t.prototype.annotate=function(t){for(var n in t)t.hasOwnProperty(n)&&(this.annotations[n]=t[n]);return this},t.prototype.optional=function(t){return this.isRequired=!Boolean(null==t||t),this},t.prototype.required=function(t){return this.isRequired=Boolean(null==t||t),this},t.concat=function(){for(var n,r=[],u,e=0;e<arguments.length;e+=1)u=arguments[e],r=r.concat(u.selected);return n=new t,n.selected=n.selected.concat(r),n};var o=function(t,n){return 0===t.indexOf("not.")?function(){var u=this._self,r={type:t};0!==arguments.length&&(r.args=Array.prototype.slice.call(arguments));var i=n.apply(e.merge({isNegated:!0},r),arguments),o=function(t){return!i(t)};return o.config=r,u.selected.push(o),u}:function(){var u=this._self,r={type:t};0!==arguments.length&&(r.args=Array.prototype.slice.call(arguments));var o=n.apply(e.merge({isNegated:!1},r),arguments);return o.config=r,u.selected.push(o),u}};t.extend=function(e){for(var r in e)e.hasOwnProperty(r)&&(t.prototype[r]=o(r,e[r]),n[r]=!1===/try|eval/.test(r)?o("not."+r,e[r]):null)},t.extend(r("./default/types.js")),t.extend(r("./default/common.js")),t.extend(r("./default/regex.js")),i.exports=t.default=t},{"./default/common.js":1,"./default/regex.js":2,"./default/types.js":3,"./errorHandler.js":4,"./util.js":6}],6:[function(e,n,u){"use strict";var r={string:"[object String]",number:"[object Number]","boolean":"[object Boolean]",date:"[object Date]",regexp:"[object RegExp]",error:"[object Error]","function":"[object Function]",arguments:"[object Arguments]",object:"[object Object]",array:"[object Array]"},t=function(t){return function(n){return t===typeof n&&"object"!=typeof n||("object"==typeof n||"function"==typeof n)&&Object.prototype.toString.call(n)===r[t]}};n.exports={merge:function(){var e={},t,n,r;for(r=0;r<arguments.length;r+=1){t=arguments[r];for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}return e},is:{Empty:function(t){for(var n in t)if(t.hasOwnProperty(n))return!1;return!0},String:t("string"),Number:t("number"),Boolean:t("boolean"),Date:t("date"),RegExp:t("regexp"),Error:t("error"),Function:t("function"),Arguments:t("arguments"),Object:t("object"),Array:t("array")}}},{}]},{},[5])(5)});