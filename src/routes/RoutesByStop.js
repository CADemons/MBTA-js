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

class RoutesByStop {
    /**
     * Creates a new RoutesByStop query object.
     * @class
     *
     * @constructor
     * @param {(String|Number)} GTFS-compatible stop_id value for which routes should be returned.
     * @property {JSON} raw Raw json from Routes request.
     */
    constructor(stop) {
        switch (typeof stop) {
            case "string":
                this.raw = request(stop);
                break;
            case "number":
                this.raw = request(stop += '');
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
function request(stop) {
    req.open('GET', `http://realtime.mbta.com/developer/api/v2/routesbystop?api_key=${Key}&stop=${stop}&format=json`, false);
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

module.exports = RoutesByStop;
