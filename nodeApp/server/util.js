/**
* Created by pushanmitra on 22/06/17.
*/
/*jslint node: true, es6: true,esversion: 6 */
/*
Import
*/

import AppConst from "./AppConst";



var Util = function () {
  this.emptyFunction = function () {};
};

Util.prototype.isFunction = function (obj) {
  return typeof obj === AppConst.Type.$function;
};

/*
Exports /
*/
export default new Util();
