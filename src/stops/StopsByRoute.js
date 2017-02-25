/**
 * Accesses Route Query: StopsByRoute.
 * @license MIT
 *
 * @author Colin Rioux
 *
 * @requires NPM:array-unique
 * @requires /src/util/request.js
 */
"use strict";
const RHelper = require('../util/request');
const unique = require('array-unique');

class StopsByRoute {
    /**
    * Creates a new StopsByRoute query object.
    * @class
    *
    * @constructor
    * @param {String} route GTFS-compatible route_id value for which stops should be returned.
    * @property {JSON} raw Raw json from StopsByRoute request.
    */
    constructor(route) {
        this.raw = RHelper.request('stopsbyroute', { "route" : route });
    }

    /**
    * Refreshes the API without requiring a new StopsByRoute object; this overwrites the current raw json.
    * @param {String} route GTFS-compatible route_id value for which stops should be returned.
    */
    refresh(route) {
        this.raw = RHelper.request('stopsbyroute', { "route" : route });
    }

    /**
    * Returns an array of directions.
    * @returns {JSON[]}
    */
    getDirectionList() { return this.raw.direction; }

    /**
    * Returns a direction whose direction_id = id.
    * @param {String|Number} id direction_id - A number greater than or equal to 0.
    * @returns {JSON}
    */
    getDirectionById(id) {
        switch (typeof id) {
            case "number":
                return run(id.toString(), this.raw);
            case "string":
                return run(id, this.raw);
        }
        function run(id, raw) {
            for (var dir in raw.direction) {
                return ((raw.direction[dir].direction_id === id) ? raw.direction[dir] : null);
            }
        }
    }

    /**
    * Returns a direction whose direction_name = name.
    * @param {String} name A direction name (i.e "Southbound").
    * @returns {JSON}
    */
    getDirectionByName(name) {
        for (var dir in this.raw.direction) {
            return ((this.raw.direction[dir].direction_name === name) ? this.raw.direction[dir] : null);
        }
    }

    /**
    * Returns an array of stops in a direction identified by the direction_id.
    * @param {String|Number} id direction_id - A number greater than or equal to 0.
    * @returns {JSON[]}
    */
    getStopListById(id) { return this.getDirectionById(id).stop; }

    /**
    * Returns an array of stops in a direction identified by the direction_name.
    * @param {String} name A direction name (i.e "Southbound").
    * @returns {JSON[]}
    */
    getStopListByName(name) { return this.getDirectionByName(name).stop; }

}

module.exports = StopsByRoute;
