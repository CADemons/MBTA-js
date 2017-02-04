/**
* Accesses Route Query: Routes
* @license MIT
*
* @author Colin Rioux
*
* @requires NPM:XMLHttpRequest
* @requires NPM:array-unique
* @requires /src/key.json
*/
"use strict";
// npm dependencies
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const Key = require('../key.json').key;
const unique = require('array-unique');


class Routes {

  /**
  * Creates a new Routes object
  * @class
  *
  * @constructor
  * @property {JSON} raw Raw json from Routes request.
  */
  constructor() {
    this.raw = request();
  }

  /**
  * Returns an array of current transportation modes.
  * @returns {String<Array>}
  */
  getModeList() {
    let arr = [];
    for (var mode in this.raw.mode)
      arr.push(this.raw.mode[mode].mode_name);
    return arr;
  }

  /**
  * Returns the modes with the provided mode name as an Array of JSON.
  * @param {String} name The name of the transportation mode.
  * @returns {Array<JSON>} if the provided mode is a transporation mode.
  * @returns {null}
  */
  getModes(name) {
    let arr = []
    for (var mode in this.raw.mode)
      if (this.raw.mode[mode].mode_name === name)
        arr.push(this.raw.mode[mode]);
    return arr || null;
  }

  /**
  * Returns the routes for the provided mode name as an Array of JSON.
  * @param {String} name The name of the transportation mode.
  * @returns {Array<JSON>} if the provided mode is a transportation mode.
  * @returns {null}
  */
  getRoutes(name) {
    let arr = [];
    let modes = this.getModes(name);
    for (var mode in modes)
      for (var route in modes[mode].route)
        arr.push(modes[mode].route[route]);
    return arr || null;
  }
}

/**
* @private
*/
function request() {
    var request = new XMLHttpRequest();
    request.open('GET', `http://realtime.mbta.com/developer/api/v2/routes?api_key=${Key}&format=json`, false);
    request.send();
    if (request.status === 200)
      return JSON.parse(request.responseText);
}

module.exports = Routes;
