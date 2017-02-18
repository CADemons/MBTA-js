/**
 * Accesses Route Query: StopsByLocation. Use StopHelper after getting a list of stops.
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

 class StopsByLocation {

     /**
     * Creates a new StopsByLocation query object.
     * @class
     *
     * @constructor
     * @param {String} lat The latitude for location near which stops should be returned.
     * @param {String} lon The longitude for location near which stops should be returned.
     * @property {JSON} raw Raw json from StopsByLocation request.
     */
     constructor(lat, lon) {
         this.raw = RHelper.request('stopsbylocation', { "lat" : lat, "lon" : lon });
     }

     /**
     * Refreshes the API without requiring a new StopsByLocation object; this overwrites the current raw json.
     * @param {String} lat The latitude for location near which stops should be returned.
     * @param {String} lon The longitude for location near which stops should be returned.
     */
     refresh(lat, lon) {
         this.raw = RHelper.request('stopsbylocation', { "lat" : lat, "lon" : lon });
     }
     /**
     * Returns an array of stops (max_size = 15).
     * @returns {JSON[]}
     */
     getStopList() { return this.raw.stop; }
 }

 module.exports = StopsByLocation;
