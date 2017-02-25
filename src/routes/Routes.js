/**
* Accesses Route Query: Routes
* @license MIT
*
* @author Colin Rioux
*
* @requires NPM:array-unique
* @requires /src/util/request.js
*/
"use strict";
const unique = require('array-unique');
const RHelper = require('../util/request');

class Routes {

  /**
  * Creates a new Routes query object.
  * @class
  *
  * @constructor
  * @property {JSON} raw Raw json from Routes request.
  */
  constructor() {
    this.raw = RHelper.request("routes", {});
  }

  /**
  * Refreshes the API without requiring a new Routes object; this overwrites the current raw json.
  */
  refresh() {
      this.raw = RHelper.request("routes", {});
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
    for (var mode in this.raw.mode)
      for (var route in this.raw.mode[mode].route)
        if (this.raw.mode[mode].route[route].route_id.toLowerCase() === id.toLowerCase())
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
    for (var mode in this.raw.mode)
      if (this.raw.mode[mode].route_type.toLowerCase() === id.toLowerCase())
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
    for (var mode in this.raw.mode)
      for (var route in this.raw.mode[mode].route)
        if (this.raw.mode[mode].route[route].route_name.toLowerCase() === name.toLowerCase())
          return this.raw.mode[mode];
    return null
  }

  /**
  * Returns the transporation mode which includes the route (in json).
  * @param {JSON} route The route json.
  * @return {JSON} the transportation mode if the route exists.
  * @return {null}
  */
  getModeByRoute(route) {
    return (this.getModeByRouteName(route.route_name) !== null) ? this.getModeByRouteName(route.route_name) : null
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

  /**
  * Returns the route with the provided route_id identifier.
  * @param {(String|Number)} id The route_id for the route either as a string or a number.
  * @returns {JSON} if the provided id is a part of a transportation mode.
  * @returns {null} otherwise.
  */
  getRouteById(id) {
    if (typeof id !== undefined && typeof id === "number") id +='';
    for (var mode in this.raw.mode)
      for (var route in this.raw.mode[mode].route)
        if (this.raw.mode[mode].route[route].route_id.toLowerCase() === id.toLowerCase())
          return this.raw.mode[mode].route[route];
    return null;
  }

  /**
  * Returns the route with the provided route_name identifier.
  * @param {(String|Number)} name The route_name either as a string or a number.
  * @returns {JSON} if the provided route_name is a part of a tranporation mode.
  * @returns {null}
  */
  getRouteByName(name) {
    if (typeof name !== undefined && typeof name === "number") name+='';
    for (var mode in this.raw.mode)
      for (var route in this.raw.mode[mode].route)
        if (this.raw.mode[mode].route[route].route_name.toLowerCase() === name.toLowerCase())
          return this.raw.mode[mode].route[route];
    return null
  }

  /**
  * Returns the route_hide value if it has one.
  * @example
  * routes.checkHide(routes.getRouteByName("72/75"))
  * @param {(JSON|String|Number)} route The route-json or the route-id or the route-name.
  * @returns {Boolean} If the the route has the property
  * @returns {null}
  */
  checkHide(route) {
    switch (typeof route) {
      case "object":
        return (route.hasOwnProperty("route_hide")) ? route.route_hide : null
      case "string":
        if (this.getRouteByName(route) !== null) return this.checkHide(this.getRouteByName(route));
        else if (this.getRouteById(route) !== null) return this.checkHide(this.getRouteById(route));
        else throw "Route-id or route-name invalid!";
        break;
      case "number":
        route += '';
        return this.checkHide(route);
      default:
        throw "Invalid parameter";
    }
    return null;
  }

}

/**
* Capitalizes strings.
* @private
*/
String.prototype.capitalize = function() {
  return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
    return p1 + p2.toUpperCase();
  });
}

module.exports = Routes;
