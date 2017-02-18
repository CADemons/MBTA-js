/**
 * Accesses Route Query: RoutesByStop
 * @license MIT
 *
 * @author Colin Rioux
 *
 * @requires NPM:array-unique
 * @requires /src/key.json
 * @requires /src/util/request.js
 */
"use strict";
const Key = require('../key.json').key;
const RHelper = require('../util/request');
const unique = require('array-unique');

class RoutesByStop {
    /**
     * Creates a new RoutesByStop query object.
     * @class
     *
     * @constructor
     * @param {(String|Number)} stop GTFS-compatible stop_id value for which routes should be returned.
     * @property {JSON} raw Raw json from Routes request.
     */
    constructor(stop) {
        switch (typeof stop) {
            case "string":
                this.raw = RHelper.request('routesbystop', { "stop" : stop });
                break;
            case "number":
                this.raw = RHelper.request('routesbystop', { "stop" : stop.toString() });
                break;
            default:
                throw "Invalid GTFS-compatible stop_id value";
                break;
        }
    }

    /**
    * Refreshes the API without requiring a new RoutesByStop object; this overwrites the current raw json.
    * @param {String|Number} stop GTFS-compatible stop_id value for which routes should be returned.
    */
    refresh(stop) {
        switch (typeof stop) {
            case "string":
                this.raw = RHelper.request('routesbystop', { "stop" : stop });
                break;
            case "number":
                this.raw = RHelper.request('routesbystop', { "stop" : stop.toString() });
                break;
            default:
                throw "Invalid GTFS-compatible stop_id value";
                break;
        }
    }

    /**
     * Returns the stop_id.
     * @returns {String}
     */
    getStopId() { return this.raw.stop_id; }

    /**
     * Returns the stop_name.
     * @returns {String}
     */
    getStopName() { return this.raw.stop_name; }

    /**
     * Returns the transportation modes for a given stop.
     * @returns {JSON[]}
     */
    getModes() { return this.raw.modes; }
}

/**
 * @private
 */
String.prototype.capitalize = function() {
    return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
}

module.exports = RoutesByStop;
