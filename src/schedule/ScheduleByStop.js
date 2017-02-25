/**
 * Accesses Route Query: ScheduleByStop.
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

 class ScheduleByStop {
     /**
     * Creates a new StopsByLocation query object.
     * @class
     *
     * @constructor
     * @param {String} stop GTFS-compatible stop_id value for which schedule should be returned.
     * @param {String} route OPTIONAL: GTFS-compatible route_id value on the stop for which schedule should be returned.
     * @param {String} direction OPTIONAL: GTFS-compatible direction_id value (either 0 or 1) on route of the stop for which schedule should be returned.
     * @param {String} datetime OPTIONAL: Epoch time after which schedule should be returned.
     * @param {String} max_time OPTIONAL: Defines maximum range of time (in minutes) within which trips will be returned.
     * @param {String} max_trips OPTIONAL: Defines number of trips to return. Integer between 1 and 100.
     * @property {JSON} raw Raw json from ScheduleByStop request.
     */
     constructor(stop, route, direction, datetime, max_time, max_trips) {
         this.raw = RHelper.request('schedulebystop', {
             "stop" : stop,
             "route" : route,
             "direction" : direction,
             "datetime" : datetime,
             "max_time" : max_time,
             "max_trips" : max_trips
         });
     }

     /**
     * Refreshes the API without requiring a new ScheduleByStop object; this overwrites the current raw json.
     * @param {String} stop GTFS-compatible stop_id value for which schedule should be returned.
     * @param {String} route OPTIONAL: GTFS-compatible route_id value on the stop for which schedule should be returned.
     * @param {String} direction OPTIONAL: GTFS-compatible direction_id value (either 0 or 1) on route of the stop for which schedule should be returned.
     * @param {String} datetime OPTIONAL: Epoch time after which schedule should be returned.
     * @param {String} max_time OPTIONAL: Defines maximum range of time (in minutes) within which trips will be returned.
     * @param {String} max_trips OPTIONAL: Defines number of trips to return. Integer between 1 and 100.
     */
     refresh(stop, route, direction, datetime, max_time, max_trips) {
         this.raw = RHelper.request('schedulebystop', {
             "stop" : stop,
             "route" : route,
             "direction" : direction,
             "datetime" : datetime,
             "max_time" : max_time,
             "max_trips" : max_trips
         });
     }

     
 }

 module.exports = ScheduleByStop;
