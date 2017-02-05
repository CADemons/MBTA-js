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
const req = new XMLHttpRequest();


class Routes {

  /**
  * Creates a new Routes object.
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
  * @returns {String[]}
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
  * @returns {JSON[]} if the provided mode is a transporation mode.
  * @returns {null} otherwise.
  */
  getModes(name) {
    let arr = []
    for (var mode in this.raw.mode)
      if (this.raw.mode[mode].mode_name === name)
        arr.push(this.raw.mode[mode]);
    return arr || null;
  }

  /**
  * Returns the transportation mode which includes a route with the provided route_id identifier.
  * @param {(String|Number)} id The route_id for the route either as a string or a number.
  * @returns {JSON} if the provided id is a part of a transportation mode.
  * @returns {null} otherwise.
  */
  getModeByRouteId(id) {
    if (typeof id !== undefined && typeof id === "number") id +='';
    id = id.toLowerCase().capitalize();
    for (var mode in this.raw.mode)
      for (var route in this.raw.mode[mode].route)
        if (this.raw.mode[mode].route[route].route_id === id)
          return this.raw.mode[mode];
    return null;
  }

  /**
  * Returns the transporation mode which is assigned the route type.
  * @param {(String|Number)} id The route_type either as a string or a number.
  * @returns {JSON} if the provided route_type is a part of a transporation mode.
  * @returns {null}
  */
  getModeByRouteType(id) {
    if (typeof id !== undefined && typeof id === "number") id+='';
    id = id.toLowerCase().capitalize();
    for (var mode in this.raw.mode)
      if (this.raw.mode[mode].route_type === id)
        return this.raw.mode[mode];
    return null
  }

  /**
  * Returns the transporation mode which includes a route with the provided route_name identifier.
  * @param {(String|Number)} name The route_name either as a string or a number.
  * @returns {JSON} if the provided route_name is a part of a tranporation mode.
  * @returns {null}
  */
  getModeByRouteName(name) {
    if (typeof name !== undefined && typeof name === "number") name+='';
    name = name.toLowerCase().capitalize();
    for (var mode in this.raw.mode)
      for (var route in this.raw.mode[mode].route)
        if (this.raw.mode[mode].route[route].route_name === name)
          return this.raw.mode[mode];
    return null
  }

  /**
  * Returns the routes for the provided mode name as an Array of JSON.
  * @param {String} name The name of the transportation mode.
  * @returns {JSON[]} if the provided mode is a transportation mode.
  * @returns {null} otherwise.
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
    req.open('GET', `http://realtime.mbta.com/developer/api/v2/routes?api_key=${Key}&format=json`, false);
    req.send();
    if (req.status === 200)
      return JSON.parse(req.responseText);
}

/**
* @private
* From stackoverflow...
*/
String.prototype.capitalize = function() {
  return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
    return p1 + p2.toUpperCase();
  });
}

module.exports = Routes;
